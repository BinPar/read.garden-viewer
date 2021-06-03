/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SetReadMode } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';
import setCSSProperty from '../../utils/setCSSProperty';
import { updateState } from '../state';
import getCoordinatesFromEvent from './getCoordinatesFromEvent';
import getMinAndMaxScroll from './getMinAndMaxScroll';
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

  const onDragStart = (ev: MouseEvent | TouchEvent): void => {
    if (ev.type === 'touchstart' || (ev as MouseEvent).button === 0) {
      mouseDown = true;
      lastX = null;
      lastY = null;
      lastDelta = 0;
    }
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
    if (mouseDown) {
      mouseDown = false;
      setCSSProperty('user-select', 'auto');
      let inertialDelta = lastDelta;
      updateScrollDeltas(ev);
      const timeFromLastMove = new Date().getMilliseconds() - lastMoveMilliseconds;
      if (lastDelta || timeFromLastMove > 100) {
        if (Math.sign(lastDelta) === Math.sign(inertialDelta)) {
          inertialDelta = lastDelta;
        }
      }
      scroll.target = scroll.current + lastDelta * state.animationInertia;
      scrollInertiaAndLimits(state, scroll, inertialDelta, executeTransitions, dispatch);
      setTimeout(() => {
        updateState({
          dragging: false,
        });
        setCSSProperty('pointer-events', 'auto');
        setCSSProperty('user-select', 'auto');
      }, 0);
    }
  };

  const onDragMove = (ev: MouseEvent | TouchEvent): void => {
    if (mouseDown) {
      ev.stopPropagation();      
      if (!state.dragging) {
        updateState({
          dragging: true,
        });
        setCSSProperty('pointer-events', 'none');
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

  let onWheelStopTimeout: NodeJS.Timeout | null = null;

  const onWheelStop = (): void => {
    onWheelStopTimeout = null;
    scrollInertiaAndLimits(state, scroll, lastDelta, executeTransitions, dispatch);
  };

  const onWheel = (ev: WheelEvent): void => {
    if (ev.ctrlKey) {
      if (state.layout === 'flow') {
        if (ev.deltaY < 0 && !state.readMode) {
          const action: SetReadMode = {
            type: 'setReadMode',
            readModeActive: true,
          };
          dispatch(action);
        }
        if (ev.deltaY > 0 && state.readMode) {
          const action: SetReadMode = {
            type: 'setReadMode',
            readModeActive: false,
          };
          dispatch(action);
        }
      }
      ev.preventDefault();
    } else if (!mouseDown) {
      if (!state.dragging) {
        updateState({
          dragging: true,
        });
      }
      scroll.forceUpdate = true;
      if (ev.deltaX !== 0) {
        lastDelta = ev.deltaX * -1;
      } else {
        lastDelta = ev.deltaY * -1;
      }
      scroll.current += lastDelta;
      const scrollLimits = getMinAndMaxScroll(state);
      if (scroll.current > scrollLimits.maxScroll) {
        scroll.current = scrollLimits.maxScroll;
        scroll.speed = 0;
        lastDelta = 0;
      } else if (scroll.current < scrollLimits.minScroll) {
        scroll.current = scrollLimits.minScroll;
        scroll.speed = 0;
        lastDelta = 0;
      }
      scroll.target = scroll.current;
      executeTransitions();
      scroll.forceUpdate = false;
      if (onWheelStopTimeout) {
        clearTimeout(onWheelStopTimeout);
      }
      onWheelStopTimeout = setTimeout(onWheelStop, 50);
      ev.preventDefault();
    }
  };
  state.readGardenContainerNode?.addEventListener('mousedown', onDragStart);
  state.readGardenContainerNode?.addEventListener('touchstart', onDragStart);
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('touchend', onDragEnd);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('touchmove', onDragMove);
  state.readGardenContainerNode?.addEventListener('wheel', onWheel);
};

export default scrollController;
