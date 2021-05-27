import { GlobalState, State } from '../model/state';
import { LayoutTypes } from '../model/viewerSettings';

import { updateState } from '../lib/state';
import { onRecalculateFinish } from '../lib/state/changeHandlers/recalculatingHandler';
import {
  clientToContentWrapperLeft,
  clientToContentWrapperTop,
} from '../utils/highlights/clientToContentWrapperCoordinates';
import setCSSProperty from '../utils/setCSSProperty';

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
    const { contentWrapperNode, contentPlaceholderNode } = state;

    const containerWidth = contentWrapperNode!.clientWidth;
    const containerHeight = contentWrapperNode!.clientHeight;

    const globalUpdate: Partial<GlobalState> = {
      containerWidth,
      containerHeight,
      recalculating: false,
    };

    if (state.layout === LayoutTypes.Flow) {
      setCSSProperty('total-width', `0px`);
      setCSSProperty('total-column-width', `0px`);
      setCSSProperty('column-width', `0px`);
      setCSSProperty('column-gap', `${state.config.columnGap}px`);
      setCSSProperty('column-count', '2');
      const {
        fontSize,
        pagesLabelsNode,
        config: { minCharsPerColumn, maxCharsPerColumn, columnGap: desiredColumnGap },
        endOfChapterCalculatorNode,
      } = state;

      pagesLabelsNode!.innerHTML = '';

      let columnGap = desiredColumnGap;
      const charWidth = fontSize / charWidthFactor;
      const minWidth = minCharsPerColumn * charWidth;
      const maxWidth = maxCharsPerColumn * charWidth + desiredColumnGap;

      if (state.scrollMode === 'horizontal') {
        const doubleColumnWidth = containerWidth / 2 - desiredColumnGap;
        const columnsInViewport = doubleColumnWidth < minWidth ? 1 : 2;
        const totalColumnWidth = containerWidth / columnsInViewport;

        if (columnsInViewport === 1) {
          if (totalColumnWidth > maxWidth) {
            const gapCompensation = Math.max(totalColumnWidth - desiredColumnGap - maxWidth, 0);
            columnGap += gapCompensation;
          } else if (totalColumnWidth < minWidth + desiredColumnGap) {
            const gapCompensation = Math.min(totalColumnWidth - minWidth - desiredColumnGap, 0);
            columnGap += gapCompensation;
          }
        }

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
        const positionByLabel = new Map<string, number>();
        const labelByPosition = new Map<number, string>();

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
          positionByLabel.set(page, position);
          lastLabel = page;
          if (lastPosition !== position) {
            labelByPosition.set(position, page);
            const label = document.createElement('div');
            label.classList.add('rg-label');
            const labelP = document.createElement('p');
            label.appendChild(labelP);
            labelP.innerText = page;
            pagesLabelsNode!.appendChild(label);
            labelsCount++;
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
            labelByPosition.set(position, lastLabel);
          }
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
          positionByLabel,
          labelByPosition,
        });
        return;
      }

      if (state.scrollMode === 'vertical') {
        const gapCompensation = Math.max(containerWidth - desiredColumnGap - maxWidth, 0);
        columnGap += gapCompensation;

        setCSSProperty('column-gap', `${columnGap}px`);

        resolve({
          ...globalUpdate,
          columnGap,
        });

        window.requestAnimationFrame(() => {
          const positionByLabel = new Map<string, number>();
          const labelByPosition = new Map<number, string>();

          contentPlaceholderNode!.querySelectorAll('[data-page]').forEach((item) => {
            const element = item as HTMLElement;
            const rawPosition = element.getBoundingClientRect().top;
            const position = clientToContentWrapperTop(rawPosition);
            const page = element.dataset.page!;
            positionByLabel.set(page, position);
            labelByPosition.set(position, page);
          });

          updateState({
            totalHeight: contentPlaceholderNode!.getBoundingClientRect().height,
            positionByLabel,
            labelByPosition,
          });
        });
        return;
      }

      resolve(globalUpdate);
      return;
    }

    resolve(globalUpdate);
  });
};

export default recalculate;
