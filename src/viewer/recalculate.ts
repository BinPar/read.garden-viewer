import { GlobalState, State } from '../model/state';
import { LayoutTypes } from '../model/viewerSettings';

import { updateState } from '../lib/state';
import { onRecalculateFinish } from '../lib/state/changeHandlers/recalculatingHandler';
import {
  clientToContentWrapperLeft,
  clientToContentWrapperTop,
} from '../utils/highlights/clientToContentWrapperCoordinates';
import setCSSProperty from '../utils/setCSSProperty';
import updatePositionsMaps from '../utils/updatePositionsMaps';
import getColumnGap from '../utils/getColumnGap';
import checkImagesHeight from '../utils/checkImagesHeight';
import applyTextCursor from '../utils/applyTextCursor';
import getMargins from '../utils/getMargins';
import checkSvgImagesHeight from '../utils/checkSvgImagesHeight';

const charWidthFactor = 1.65;

/**
 * Recalculates viewer layout
 * @param state Viewer state
 */
const recalculate = async (state: State): Promise<Partial<State>> => {
  if (state.recalculating) {
    try {
      await onRecalculateFinish();
    } catch (ex) {
      return {};
    }
  }
  updateState({ recalculating: true });
  return new Promise<Partial<State>>((resolve): void => {
    const { readGardenContainerNode, readGardenViewerNode, contentPlaceholderNode } = state;

    const containerRect = readGardenContainerNode!.getBoundingClientRect();
    const { width: containerWidth, height: containerHeight } = containerRect;
    const margin = getMargins({ config: state.config, containerWidth, readMode: state.readMode });

    const globalUpdate: Partial<GlobalState> = {
      containerWidth,
      containerHeight,
      recalculating: false,
      margin,
    };

    if (state.layout === LayoutTypes.Flow) {
      setCSSProperty('total-width', `0px`);
      setCSSProperty('total-column-width', '0px');
      setCSSProperty('column-width', '0px');
      setCSSProperty('column-gap', `${state.config.columnGap}px`);
      setCSSProperty('column-count', '2');
      const {
        fontSize,
        pagesLabelsNode,
        config: { minCharsPerColumn, maxCharsPerColumn, columnGap: desiredColumnGap },
        endOfChapterCalculatorNode,
      } = state;

      pagesLabelsNode!.innerHTML = '';

      const charWidth = fontSize / charWidthFactor;
      const minWidth = Math.min(minCharsPerColumn * charWidth, containerWidth);
      const maxWidth = Math.min(maxCharsPerColumn * charWidth + desiredColumnGap, containerWidth);

      if (state.scrollMode === 'horizontal') {
        const doubleColumnWidth = containerWidth / 2 - desiredColumnGap;
        const columnsInViewport = doubleColumnWidth < minWidth ? 1 : 2;
        const totalColumnWidth = containerWidth / columnsInViewport;

        const columnGap = Math.max(
          getColumnGap(totalColumnWidth, maxWidth, minWidth, desiredColumnGap),
          state.config.minColumnGap,
        );

        const columnWidth = totalColumnWidth - columnGap;

        setCSSProperty('column-count', `${columnsInViewport}`);
        setCSSProperty('column-gap', `${columnGap}px`);
        setCSSProperty('column-width', `${columnWidth}px`);
        setCSSProperty('total-column-width', `${totalColumnWidth}px`);

        const endChapterRawPosition = endOfChapterCalculatorNode!.getBoundingClientRect().left;
        const endChapterPosition = clientToContentWrapperLeft(endChapterRawPosition);
        const lastColumnPosition =
          Math.round(endChapterPosition / totalColumnWidth) * totalColumnWidth;
        const totalWidth = lastColumnPosition + totalColumnWidth;
        const totalColumns = totalWidth / totalColumnWidth;

        setCSSProperty('total-width', `${totalWidth}px`);
        setCSSProperty(
          'scroll-width',
          `${
            Math.ceil(totalColumns / columnsInViewport) * columnsInViewport * totalColumnWidth - 15
          }px`,
        );

        const columnsPositions = Array(totalColumns)
          .fill(0)
          .map((_, i) => i * totalColumnWidth)
          .reverse();
        const positionBySlug = new Map<string, number>();
        const slugByPosition = new Map<number, string>();

        let lastPosition: number | null = null;
        let labelsCount = 0;
        let lastLabel = '';

        let minTotalWidth = 0;
        contentPlaceholderNode!.querySelectorAll('[data-page]').forEach((item) => {
          const element = item as HTMLElement;
          const rawPosition = element.getBoundingClientRect().left;
          const contentWrapperPosition = clientToContentWrapperLeft(rawPosition);
          const position = columnsPositions.find((p) => p < contentWrapperPosition)!;
          const page = element.dataset.page!;
          positionBySlug.set(page, position);
          lastLabel = page;
          if (lastPosition !== position) {
            if (lastPosition === null) {
              slugByPosition.set(position, page);
              const label = document.createElement('div');
              label.classList.add('rg-label');
              const labelP = document.createElement('p');
              label.appendChild(labelP);
              labelP.innerText = page;
              pagesLabelsNode!.appendChild(label);
              labelsCount++;
            } else {
              let labelPosition = lastPosition + totalColumnWidth;
              while (labelPosition <= position) {
                slugByPosition.set(labelPosition, page);
                const label = document.createElement('div');
                label.classList.add('rg-label');
                const labelP = document.createElement('p');
                label.appendChild(labelP);
                labelP.innerText = page;
                pagesLabelsNode!.appendChild(label);
                labelsCount++;
                labelPosition += totalColumnWidth;
              }
            }
          }
          lastPosition = position;
          minTotalWidth = Math.max(minTotalWidth, position);
        });

        if (lastLabel) {
          let position = lastPosition!;
          for (let i = labelsCount + 1, l = totalColumns; i <= l; i++) {
            position += totalColumnWidth;
            const label = document.createElement('div');
            label.classList.add('rg-label');
            const labelP = document.createElement('p');
            label.appendChild(labelP);
            labelP.innerText = lastLabel;
            pagesLabelsNode!.appendChild(label);
            slugByPosition.set(position, lastLabel);
          }
          lastPosition = position;
        }

        if (document.scrollingElement?.scrollTop) {
          document.scrollingElement.scrollTop = 0;
        }

        const images = contentPlaceholderNode!.querySelectorAll('img');
        if (images.length) {
          Array.from(images).map((i) => checkImagesHeight([i], state));
        }

        const svgImages = contentPlaceholderNode!.querySelectorAll<SVGImageElement>('svg image');
        if (svgImages.length) {
          Array.from(svgImages).map((i) => checkSvgImagesHeight([i], state));
        }

        resolve({
          ...globalUpdate,
          totalWidth,
          totalColumnWidth,
          totalColumns,
          columnsInViewport,
          columnWidth,
          columnGap,
          positionBySlug,
          slugByPosition,
          lastPosition: lastPosition!,
        });

        applyTextCursor(contentPlaceholderNode);

        return;
      }

      if (state.scrollMode === 'vertical') {
        const availableWidth = containerWidth - (margin.left + margin.right);
        const desiredGap = availableWidth - maxWidth;
        const minColumnGap = margin.horizontalPadding ?? state.config.minColumnGap;
        const columnGap = Math.max(desiredGap, minColumnGap * 2);

        setCSSProperty('column-gap', `${columnGap}px`);
        setCSSProperty('vertical-translate', '0');
        updateState({ scrollTop: 0 });

        const marginTop =
          parseInt(window.getComputedStyle(readGardenViewerNode!).marginTop, 10) || 0;

        const positionBySlug = new Map<string, number>();
        const slugByPosition = new Map<number, string>();

        let lastPosition = 0;

        contentPlaceholderNode!.querySelectorAll('[data-page]').forEach((item) => {
          const element = item as HTMLElement;
          const rawPosition = element.getBoundingClientRect().top - marginTop;
          const position = clientToContentWrapperTop(rawPosition);
          const page = element.dataset.page!;
          positionBySlug.set(page, position);
          slugByPosition.set(position, page);
          lastPosition = position;
        });

        const totalHeight = contentPlaceholderNode!.getBoundingClientRect().height / state.scale;

        resolve({
          ...globalUpdate,
          columnGap,
          totalHeight,
          lastPosition,
          positionBySlug,
          slugByPosition,
        });

        setCSSProperty('scroll-height', `${totalHeight}px`);
        applyTextCursor(contentPlaceholderNode);
        return;
      }

      resolve(globalUpdate);
      return;
    }

    if (state.layout === LayoutTypes.Fixed) {
      updatePositionsMaps(state);
    }

    resolve(globalUpdate);
  });
};

export default recalculate;
