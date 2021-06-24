import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';
import { zoom, leftCorrector, topCorrector } from './interpolationValues';

export interface MinAndMaxScroll {
  minScroll: number;
  maxScroll: number;
}

const getMinAndMaxScroll = (state: State, forceMargin: number | null = null): MinAndMaxScroll => {
  let margin = forceMargin ?? window.innerWidth / 2;
  let minScroll = margin * -1;
  let maxScroll = margin;
  if (state.layout === LayoutTypes.Flow || state.layout === LayoutTypes.Fixed) {
    if (state.scrollMode === 'horizontal') {
      if (state.slugByPosition) {
        let max = 0;
        let i = 0;
        let endOfFirstPage = 0;
        state.slugByPosition.forEach((value, key) => {
          const columns = state.layout === LayoutTypes.Flow ? state.columnsInViewport : 1;
          if (endOfFirstPage === 0) {
            endOfFirstPage = key;
          }
          if (i++ % columns === 0) {
            max = key;
          }
        });

        minScroll = margin * -1 - max;
        if (state.layout === LayoutTypes.Fixed) {
          const correctorFix = -leftCorrector.current / zoom.current;
          maxScroll = correctorFix + state.margin.left * zoom.current;
          minScroll = -1 * state.totalWidth + correctorFix - state.margin.left * zoom.current;
        }
      }
    } else if (state.scrollMode === 'vertical') {
      margin = forceMargin ?? window.innerHeight / 2;
      maxScroll = margin;
      minScroll = window.innerHeight - state.totalHeight - margin;
    }
  }
  return { minScroll, maxScroll };
};

export const getMinAndMaxAltScroll = (state: State): MinAndMaxScroll => {
  if (state.layout === LayoutTypes.Fixed) {
    if (state.scrollMode === 'horizontal') {
      const additional = (window.innerHeight / zoom.target - state.maxHeight ) / 2;
      const correctorFix = -topCorrector.target / zoom.target;
      if (additional >= 0) {
        return {
          maxScroll: correctorFix + additional,
          minScroll: correctorFix + additional,
        };
      }

      const maxScroll = correctorFix;
      const minScroll = additional * 2+ correctorFix;
      return {
        maxScroll,
        minScroll,
      };
    }
  }
  return { minScroll: 0, maxScroll: 0 };
};

export default getMinAndMaxScroll;
