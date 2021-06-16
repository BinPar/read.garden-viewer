import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

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
          const additionalMargin  = (window.innerWidth) / 2;
          maxScroll += additionalMargin;
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
      const verticalCenter = (window.innerHeight - state.maxHeight) / 2;
      const midMaxHeight = (state.maxHeight * state.zoom) / 2;
      return {
        maxScroll: verticalCenter + midMaxHeight,
        minScroll: verticalCenter - midMaxHeight,
      };
    }
  }
  return { minScroll: 0, maxScroll : 0};
};

export default getMinAndMaxScroll;
