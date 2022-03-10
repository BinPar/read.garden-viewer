import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';
import { scale, zoom, leftCorrector, topCorrector } from './interpolationValues';

const calculatePagePosition = (currentScroll: number, state: State): number => {
  let scrollPosition = Math.round(currentScroll * -1);
  if (state.scrollMode === 'horizontal') {
    if (state.layout === LayoutTypes.Fixed) {
      const targetScale = Math.abs(scale.current * zoom.current);
      const correction = (state.margin.left - leftCorrector.current) / targetScale;
      scrollPosition += correction;
    }
  }
  if (state.scrollMode === 'vertical') {
    if (state.layout === LayoutTypes.Fixed) {
      const targetScale = Math.abs(scale.current * zoom.current);
      const correction = (state.margin.top - topCorrector.current) / targetScale;
      scrollPosition += correction;
    }
  }
  return scrollPosition;
};

export default calculatePagePosition;
