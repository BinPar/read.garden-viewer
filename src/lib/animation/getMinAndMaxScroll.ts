import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

interface MinAndMaxScroll {
  minScroll: number;
  maxScroll: number;
}

const getMinAndMaxScroll = (state: State, forceMargin: number | null = null): MinAndMaxScroll => {
  let margin = forceMargin ?? window.innerWidth / 2;
  let minScroll = margin * -1;
  let maxScroll = margin;
  if (state.layout === LayoutTypes.Flow || state.layout === LayoutTypes.Fixed) {
    if (state.scrollMode === 'horizontal') {      
      if (state.labelByPosition) {
        let max = 0;
        let i = 0;
        state.labelByPosition.forEach((value, key) => {
          const columns = state.layout === LayoutTypes.Flow ? state.columnsInViewport : 1;
          if (i++ % columns === 0) {
            max = key;
          }
        });
        minScroll = margin * -1 - max;
      }
    } else if (state.scrollMode === 'vertical') {
      margin = forceMargin ?? window.innerHeight / 2;
      maxScroll = margin;
      minScroll = window.innerHeight - state.totalHeight - margin;
    }
  }  
  return { minScroll, maxScroll };
};

export default getMinAndMaxScroll;
