import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';
import { scale, zoom, leftCorrector } from './interpolationValues';

const calculatePagePosition = (currentScroll: number, state: State) => {
  let scrollPosition = Math.round(currentScroll * -1);
  if (state.scrollMode === 'horizontal') {
    if (state.layout === LayoutTypes.Fixed) {
      const targetScale = Math.abs(scale.current * zoom.current);
      const correction = (state.margin.left - leftCorrector.current) / targetScale;
      scrollPosition += correction;
    }
  }
  return scrollPosition;
};

export default calculatePagePosition;
