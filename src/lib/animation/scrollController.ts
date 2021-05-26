/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';
import setCSSProperty from '../../utils/setCSSProperty';
import { updateState } from '../state';
import getCoordinatesFromEvent from './getCoordinatesFromEvent';
import { InterpolationValue } from './interpolationValues';
import scrollInertiaAndLimits from './scrollInertiaAndLimits';

const scrollController = (
  state: State,
  dispatch: DispatchAPIAction,
  scroll: InterpolationValue,
  executeTransitions: () => void,
): void => {
  let mouseDown = false;
  let lastDelta = 0;
  let lastX: null | number = null;
  let lastY: null | number = null;
  let lastMoveMilliseconds: number = new Date().getMilliseconds();

  const onDragStart = (): void => {
    mouseDown = true;
    lastX = null;
    lastY = null;
    lastDelta = 0;
  };

  const updateScrollDeltas = (ev: MouseEvent | TouchEvent): void => {
    const coordinates = getCoordinatesFromEvent(ev);
    if (state.scrollMode === 'horizontal') {
      if (lastX !== null) {
        lastDelta = coordinates.x - lastX;
      }
      lastX = coordinates.x;
    }
    if (state.scrollMode === 'vertical') {
      if (lastY !== null) {
        lastDelta = coordinates.y - lastY;
      }
      lastY = coordinates.y;
    }
  };

  const onDragEnd = (ev: MouseEvent | TouchEvent): void => {
    mouseDown = false;
    setCSSProperty('user-select', 'auto');
    if (lastDelta) {
      let inertialDelta = lastDelta;
      updateScrollDeltas(ev);
      const timeFromLastMove = new Date().getMilliseconds() - lastMoveMilliseconds;
      if (lastDelta || timeFromLastMove > 100) {
        if (Math.sign(lastDelta) === Math.sign(inertialDelta)) {
          inertialDelta = lastDelta;
        }        
      }
      scroll.target = scroll.current + lastDelta * state.animationInertia;
      scrollInertiaAndLimits(state, scroll, inertialDelta, executeTransitions);
    }
    setTimeout(() => {
      updateState({
        dragging: false,
      });
    }, 0);
  };

  const onDragMove = (ev: MouseEvent | TouchEvent): void => {
    if (mouseDown) {
      if (!state.dragging) {
        updateState({
          dragging: true,
        });
        setCSSProperty('user-select', 'none');
      }
      scroll.forceUpdate = true;
      updateScrollDeltas(ev);
      scroll.current += lastDelta;
      scroll.target = scroll.current;
      executeTransitions();
      scroll.forceUpdate = false;
      lastMoveMilliseconds = new Date().getMilliseconds();
    }
  };
  state.readGardenContainerNode?.addEventListener('mousedown', onDragStart);
  state.readGardenContainerNode?.addEventListener('touchstart', onDragStart);
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('touchend', onDragEnd);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('touchmove', onDragMove);
};

export default scrollController;
