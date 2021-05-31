/* eslint-disable no-param-reassign */
import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';
import { InterpolationValue } from './interpolationValues';


const scrollInertiaAndLimits = (
  state: State,
  scroll: InterpolationValue,
  lastDelta: number,
  executeTransitions: () => void,
): void => {
  let min: number | null = null;
  let max: number | null = null;
  let minDistance: number | null = null;
  if (state.layout === LayoutTypes.Flow && state.scrollMode === 'horizontal') {
    const scrollingToTheRight = lastDelta < 0;
    const scrollingToTheLeft = lastDelta > 0;
    const scrollingToTheNearest = lastDelta === 0;
    const targetPosition = scroll.target * -1;
    let found = false;
    let target: number | null = null;
    let i = 0;
    state.labelByPosition.forEach((value, key) => {
      if (!found && i++ % state.columnsInViewport === 0) {
        if (min === null) {
          min = key;
        }
        max = key;
        if (scrollingToTheRight) {
          if (key > targetPosition) {
            found = true;
            target = key;
          }
        }
        if (scrollingToTheLeft) {
          if (key < targetPosition) {
            target = key;
          }
        }
        if (scrollingToTheNearest) {
          if (minDistance === null || minDistance > Math.abs(key - targetPosition)) {
            target = key;
            minDistance = Math.abs(key - targetPosition);
          }
        }
      }
    });
    if (target !== null) {
      scroll.target = target * -1;
    }
  } else {
    scroll.target += lastDelta * state.animationInertia;
    if (state.layout === LayoutTypes.Flow) {
      max = state.totalHeight - window.innerHeight;
    }
    min = 0;
  }
  if (min !== null && scroll.target * -1 < min) {
    scroll.target = min * -1;
  }
  if (max !== null && scroll.target * -1 > max) {
    scroll.target = max * -1;
  }
  executeTransitions();
};

export default scrollInertiaAndLimits;
