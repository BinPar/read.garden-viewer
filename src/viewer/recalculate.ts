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
    const { readGardenContainerNode, contentPlaceholderNode } = state;

    const containerRect = readGardenContainerNode!.getBoundingClientRect();
    const { width: containerWidth, height: containerHeight } = containerRect;

    const globalUpdate: Partial<GlobalState> = {
      containerWidth,
      containerHeight,
      recalculating: false,
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
        return;
      }

      if (state.scrollMode === 'vertical') {
        const columnGap = Math.max(
          getColumnGap(containerWidth, maxWidth, minWidth, desiredColumnGap),
          state.config.minColumnGap,
        );

        setCSSProperty('column-gap', `${columnGap}px`);

        resolve({
          ...globalUpdate,
          columnGap,
        });

        window.requestAnimationFrame(() => {
          const positionBySlug = new Map<string, number>();
          const slugByPosition = new Map<number, string>();

          contentPlaceholderNode!.querySelectorAll('[data-page]').forEach((item) => {
            const element = item as HTMLElement;
            const rawPosition = element.getBoundingClientRect().top;
            const position = clientToContentWrapperTop(rawPosition);
            const page = element.dataset.page!;
            positionBySlug.set(page, position);
            slugByPosition.set(position, page);
          });

          updateState({
            totalHeight: contentPlaceholderNode!.getBoundingClientRect().height,
            positionBySlug,
            slugByPosition,
          });
        });
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
