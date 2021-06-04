import { State } from "../../model/state";
import { LayoutTypes } from "../../model/viewerSettings";
import { scale, zoom } from './interpolationValues';

const calculatePagePosition = (currentScroll: number, state: State) => {
  let scrollPosition = Math.round(currentScroll * -1);
  if (state.scrollMode !== 'fixed') {
    if (state.scrollMode === 'horizontal') {
      if (state.layout === LayoutTypes.Flow) {
        const targetScale = Math.abs(scale.current * zoom.current);
        const realWidth = window.innerWidth - state.margin.left - state.margin.right;
        scrollPosition += ((realWidth / 2) + state.margin.left) / targetScale;
      }
    }
  }
  return scrollPosition;
};

export default calculatePagePosition;