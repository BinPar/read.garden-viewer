import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';
import { zoom, leftCorrector, topCorrector, scale } from './interpolationValues';

export interface MinAndMaxScroll {
  minScroll: number;
  maxScroll: number;
}

const getMinAndMaxScroll = (state: State, forceMargin: number | null = null): MinAndMaxScroll => {
  const margin =
    forceMargin ??
    (state.scrollMode === 'horizontal' ? window.innerWidth / 2 : window.innerHeight / 2);
  let minScroll = margin * -1;
  let maxScroll = margin;
  if (state.layout === LayoutTypes.Flow || state.layout === LayoutTypes.Fixed) {
    if (state.scrollMode === 'horizontal') {
      if (state.slugByPosition) {
        let max = 0;
        let i = 0;
        let endOfFirstPage = 0;
        const columns = state.layout === LayoutTypes.Flow ? state.columnsInViewport : 1;
        state.slugByPosition.forEach((value, key) => {
          if (endOfFirstPage === 0) {
            endOfFirstPage = key;
          }
          if (i++ % columns === 0) {
            max = key;
          }
        });

        minScroll = margin * -1 - max;
        if (state.layout === LayoutTypes.Fixed) {
          const targetScale = Math.abs(scale.target * zoom.target);
          const correctorFix = -leftCorrector.target / targetScale;
          maxScroll = correctorFix;
          const maxScrollableWidth =
            state.totalWidth -
            (state.containerWidth - (state.margin.left + state.margin.right * 2)) / targetScale;
          minScroll = -1 * maxScrollableWidth + correctorFix;
        }
      }
    } else if (state.scrollMode === 'vertical') {
      if (state.slugByPosition) {
        let max = 0;
        let i = 0;
        let endOfFirstPage = 0;
        const columns = state.layout === LayoutTypes.Flow ? state.columnsInViewport : 1;
        state.slugByPosition.forEach((value, key) => {
          if (endOfFirstPage === 0) {
            endOfFirstPage = key;
          }
          if (i++ % columns === 0) {
            max = key;
          }
        });

        minScroll = margin * -1 - max;
        if (state.layout === LayoutTypes.Fixed) {
          const targetScale = Math.abs(scale.target * zoom.target);
          const correctorFix = -topCorrector.target / targetScale;
          maxScroll = correctorFix;
          const maxScrollableHeight =
            state.totalHeight -
            (state.containerHeight - (state.margin.top + state.margin.bottom)) / targetScale;
          minScroll = -1 * maxScrollableHeight + correctorFix;
        }
      }
    }
  }
  return { minScroll, maxScroll };
};

export const getMinAndMaxAltScroll = (state: State): MinAndMaxScroll => {
  if (state.layout === LayoutTypes.Fixed) {
    if (state.scrollMode === 'horizontal') {
      const targetScale = Math.abs(scale.target * zoom.target);
      const additional = (state.containerHeight / zoom.target - state.maxHeight) / 2;
      const correctorFix = -topCorrector.target / targetScale;
      if (additional >= 0) {
        return {
          maxScroll: correctorFix + additional,
          minScroll: correctorFix + additional,
        };
      }
      const maxScroll = correctorFix;
      const minScroll = additional * 2 + correctorFix;
      return {
        maxScroll,
        minScroll,
      };
    }
    if (state.scrollMode === 'vertical') {
      const targetScale = Math.abs(scale.target * zoom.target);
      const additional = (state.containerWidth / zoom.target - state.maxWidth) / 2;
      const correctorFix = -leftCorrector.target / targetScale;
      if (additional >= 0) {
        return {
          maxScroll: correctorFix + additional,
          minScroll: correctorFix + additional,
        };
      }
      const maxScroll = correctorFix;
      const minScroll = additional * 2 + correctorFix;
      return {
        maxScroll,
        minScroll,
      };
    }
  }
  return { minScroll: 0, maxScroll: 0 };
};

export default getMinAndMaxScroll;
