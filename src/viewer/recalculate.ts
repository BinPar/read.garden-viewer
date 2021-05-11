import { GlobalState, LayoutTypes, State } from '../model/state';
import setCSSProperty from '../utils/setCSSProperty';

const charWidthFactor = 1.65;

/**
 * Recalculates viewer layout
 * @param state Viewer state
 */
const recalculate = async (state: State): Promise<Partial<State>> =>
  new Promise<Partial<State>>((resolve): void => {
    const { contentWrapperNode, contentPlaceholderNode } = state;

    const containerWidth = contentWrapperNode!.clientWidth;
    const containerHeight = contentWrapperNode!.clientHeight;

    const globalUpdate: Partial<GlobalState> = {
      containerWidth,
      containerHeight,
    };

    if (state.layout === LayoutTypes.Flow) {
      setCSSProperty('total-width', `0px`);
      setCSSProperty('total-column-width', `0px`);
      setCSSProperty('column-width', `0px`);
      setCSSProperty('column-gap', `${state.config.columnGap}px`);
      setCSSProperty('column-count', '2');

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const {
            fontSize,
            pagesLabelsNode,
            config: { minCharsPerColumn, maxCharsPerColumn, columnGap: desiredColumnGap },
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
            const columnWidth = totalColumnWidth - desiredColumnGap;
            const totalColumns = Math.ceil(
              contentPlaceholderNode!.getBoundingClientRect().width / totalColumnWidth,
            );
            const totalWidth = totalColumns * totalColumnWidth;

            if (columnsInViewport === 1) {
              if (totalColumnWidth > maxWidth) {
                const gapCompensation = Math.max(totalColumnWidth - desiredColumnGap - maxWidth, 0);
                columnGap += gapCompensation;
              } else if (totalColumnWidth < minWidth + desiredColumnGap) {
                const gapCompensation = Math.min(totalColumnWidth - minWidth - desiredColumnGap, 0);
                columnGap += gapCompensation;
              }
            }

            const columnsPositions = Array(totalColumns)
              .fill(0)
              .map((_, i) => i * totalColumnWidth)
              .reverse();
            const positionByLabel = new Map<string, number>();
            const labelByPosition = new Map<number, string>();

            let lastPosition: number | null = null;

            contentPlaceholderNode?.querySelectorAll('[data-page]').forEach((item) => {
              const element = item as HTMLElement;
              const rawPosition = element.getBoundingClientRect().left;
              const position = columnsPositions.find((p) => p < rawPosition)!;
              const page = element.dataset.page!;
              positionByLabel.set(page, position);
              labelByPosition.set(position, page);
              if (lastPosition !== position) {
                const label = document.createElement('div');
                label.classList.add('rg-label');
                const labelP = document.createElement('p');
                label.appendChild(labelP);
                labelP.innerText = page;
                pagesLabelsNode!.appendChild(label);
              }
              lastPosition = position;
            });

            setCSSProperty('total-width', `${totalWidth}px`);
            setCSSProperty('total-column-width', `${totalColumnWidth}px`);
            setCSSProperty('column-width', `${columnWidth}px`);
            setCSSProperty('column-gap', `${columnGap}px`);
            setCSSProperty('column-count', `${columnsInViewport}`);

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
          }

          if (state.scrollMode === 'vertical') {
            const gapCompensation = Math.max(containerWidth - desiredColumnGap - maxWidth, 0);
            columnGap += gapCompensation;

            setCSSProperty('column-gap', `${columnGap}px`);
            
            resolve({
              ...globalUpdate,
              columnGap
            });
          }

          resolve({});
        });
      });

      return;
    }

    resolve({});
  });

export default recalculate;
