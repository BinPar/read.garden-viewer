import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';
import { updateState } from '../state';
import calculatePagePosition from './calculatePagePosition';
import { scale, zoom } from './interpolationValues';

let lastStartPage = -1;
let lastEndPage = -1;

/**
 * To be called on book change
 */
export const resetLastPage = (): void => {
  lastStartPage = -1;
  lastEndPage = -1;
};

const recalculateCurrentPage = (state: State, currentScroll: number, avoidUpdate = false): void => {
  const scrollPosition = Math.round(currentScroll * -1);
  let target: string | undefined;
  if (state.scrollMode !== 'fixed') {
    if (state.scrollMode === 'horizontal') {
      if (state.layout === LayoutTypes.Flow) {
        target = state.slugByPosition.get(scrollPosition);
      } else {
        const targetScale = Math.abs(scale.current * zoom.current);
        const targetScroll =
          calculatePagePosition(currentScroll, state) - state.margin.left / targetScale + 1;
        const baseScroll = targetScroll - state.margin.left / targetScale;
        const visibleWidth = state.containerWidth / targetScale;
        const endScroll = baseScroll + visibleWidth;
        let startPage = 0;
        let endPage = -1;
        const startingElementIndex =
          Math.floor((baseScroll * state.contentsInfo.length) / state.totalWidth) - 2;
        for (
          let i = Math.max(0, startingElementIndex), l = state.contentsInfo.length;
          i < l && endPage === -1;
          i++
        ) {
          const { left, maxLeft, slug } = state.contentsInfo[i];
          if (left <= baseScroll) {
            startPage = i;
          }
          if (left <= targetScroll) {
            target = slug;
          }
          if (left <= endScroll && maxLeft >= endScroll) {
            endPage = i;
          }
        }
        if (endPage === -1) {
          endPage = state.contentsInfo.length - 1;
        }
        if (state.contentPlaceholderNode && state.layout === LayoutTypes.Fixed) {
          if (lastStartPage !== startPage || endPage !== lastEndPage) {
            if (lastStartPage !== -1) {
              for (let i = lastStartPage; i <= lastEndPage; i++) {
                const element = state.contentPlaceholderNode.childNodes[i] as HTMLElement;
                element.style.setProperty('--page-display', 'none');
              }
            }
            for (let i = startPage; i <= endPage; i++) {
              const element = state.contentPlaceholderNode.childNodes[i] as HTMLElement;
              element.style.setProperty('--page-display', 'block');
            }
            lastStartPage = startPage;
            lastEndPage = endPage;
          }
        }
      }
    } else {
      state.slugByPosition.forEach((value, key): void => {
        if (key <= scrollPosition) {
          target = value;
        }
      });
    }
  }
  if (target !== undefined && !avoidUpdate) {
    updateState({ contentSlug: target });
  }
};

export default recalculateCurrentPage;
