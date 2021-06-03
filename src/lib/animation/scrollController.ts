/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SetReadMode } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/apiInterface';
import { SelectionInfo, SyntheticEvent } from '../../model/dom';
import { State } from '../../model/state';
import { drawHighlights } from '../../utils/highlights';
import removeHighlights from '../../utils/highlights/removeHighlights';
import setCSSProperty from '../../utils/setCSSProperty';
import { updateState } from '../state';
import getCoordinatesFromEvent from './getCoordinatesFromEvent';
import getMinAndMaxScroll from './getMinAndMaxScroll';
import getSyntheticEvent from './getSyntheticEvent';
import { InterpolationValue, zoom, scale } from './interpolationValues';
import getWordSelection from './getWordSelection';
import scrollInertiaAndLimits from './scrollInertiaAndLimits';
import { LayoutTypes } from '../../model/viewerSettings';
import updateZoom from './updateZoom';

const scrollController = (
  state: State,
  dispatch: DispatchAPIAction,
  scroll: InterpolationValue,
  altScroll: InterpolationValue,
  executeTransitions: () => void,
): void => {
  let mouseDown = false;
  let lastDelta = 0;
  let altDelta = 0;
  let lastX: null | number = null;
  let lastY: null | number = null;
  let lastMoveMilliseconds: number = new Date().getMilliseconds();

  const { selectionHighlightsNode } = state as Required<State>;
  let currentSelection: SelectionInfo | null = null;

  const isPreviousThanSelection = (event: SyntheticEvent): boolean => {
    if (currentSelection) {
      const { top, bottom, left } = currentSelection;
      return top > event.clientY || (left > event.clientX && bottom > event.clientY);
    }
    return false;
  };

  const onDragStart = (ev: MouseEvent | TouchEvent): void => {
    if (ev.type === 'touchstart' || (ev as MouseEvent).button === 0) {
      removeHighlights(selectionHighlightsNode);
      const wordSelection = !state.config.disableSelection && getWordSelection(ev);
      if (wordSelection) {
        ev.preventDefault();
        ev.stopPropagation();
        const { top, bottom, left } = wordSelection.getBoundingClientRect();
        currentSelection = {
          top,
          bottom,
          left,
          startContainer: wordSelection.startContainer,
          startOffset: wordSelection.startOffset,
          endContainer: wordSelection.endContainer,
          endOffset: wordSelection.endOffset,
        };
      } else {
        mouseDown = true;
        lastX = null;
        lastY = null;
        lastDelta = 0;
        altDelta = 0;
      }
    }
  };

  const updateScrollDeltas = (ev: MouseEvent | TouchEvent): void => {
    const screenToScale =
      1 /
      (state.layout === LayoutTypes.Flow
        ? Math.abs(scale.current)
        : Math.abs(scale.current * zoom.current));
    const coordinates = getCoordinatesFromEvent(ev);
    if (state.layout === LayoutTypes.Flow) {
      if (state.scrollMode === 'horizontal') {
        if (lastX !== null) {
          lastDelta = coordinates.x - lastX;
          lastDelta *= screenToScale;
        }
        lastX = coordinates.x;
      }
      if (state.scrollMode === 'vertical') {
        if (lastY !== null) {
          lastDelta = coordinates.y - lastY;
          lastDelta *= screenToScale;
        }
        lastY = coordinates.y;
      }
    }
    if (state.layout === LayoutTypes.Fixed) {
      if (state.scrollMode === 'horizontal') {
        if (lastX !== null) {
          lastDelta = coordinates.x - lastX;
          lastDelta *= screenToScale;
        }
        lastX = coordinates.x;
        if (lastY !== null) {
          altDelta = coordinates.y - lastY;
          altDelta *= screenToScale;
        }
        lastY = coordinates.y;
      }
      if (state.scrollMode === 'vertical') {
        if (lastX !== null) {
          altDelta = coordinates.x - lastX;
          altDelta *= screenToScale;
        }
        lastX = coordinates.x;
        if (lastY !== null) {
          lastDelta = coordinates.y - lastY;
          lastDelta *= screenToScale;
        }
        lastY = coordinates.y;
      }
    }
  };

  const onDragEnd = (ev: MouseEvent | TouchEvent): void => {
    if (mouseDown) {
      mouseDown = false;
      setCSSProperty('user-select', 'auto');
      let inertialDelta = lastDelta;
      let altInertialDelta = altDelta;
      updateScrollDeltas(ev);
      const timeFromLastMove = new Date().getMilliseconds() - lastMoveMilliseconds;
      if (lastDelta || timeFromLastMove > 100) {
        if (Math.sign(lastDelta) === Math.sign(inertialDelta)) {
          inertialDelta = lastDelta;
        }
      }
      scroll.target = scroll.current + lastDelta * state.animationInertia;
      scrollInertiaAndLimits(state, scroll, inertialDelta, executeTransitions, dispatch);
      if (state.layout === LayoutTypes.Fixed) {
        if (altDelta || timeFromLastMove > 100) {
          if (Math.sign(altDelta) === Math.sign(altInertialDelta)) {
            altInertialDelta = altDelta;
          }
        }
        altScroll.target = altScroll.current + altDelta * state.animationInertia;
        scrollInertiaAndLimits(
          state,
          altScroll,
          altInertialDelta,
          executeTransitions,
          dispatch,
          true,
        );
      }

      setTimeout(() => {
        updateState({
          dragging: false,
        });
        setCSSProperty('pointer-events', 'auto');
        setCSSProperty('user-select', 'auto');
      }, 0);
    }
    if (currentSelection) {
      currentSelection = null;
      updateState({
        selectingText: false,
      });
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
      if (state.layout === LayoutTypes.Fixed) {
        altScroll.current += altDelta;
        altScroll.target = altScroll.current;
      }
      executeTransitions();
      scroll.forceUpdate = false;
      lastMoveMilliseconds = new Date().getMilliseconds();
    }
    if (currentSelection) {
      if (!state.selectingText) {
        updateState({
          selectingText: true,
        });
      }
      const event = getSyntheticEvent(ev);
      const wordSelection = getWordSelection(ev, event);
      if (wordSelection) {
        const isPrevious = isPreviousThanSelection(event);
        const { startContainer, startOffset, endContainer, endOffset } = currentSelection;
        if (isPrevious) {
          wordSelection.setEnd(endContainer, endOffset);
        } else {
          wordSelection.setStart(startContainer, startOffset);
        }
        drawHighlights(selectionHighlightsNode, [wordSelection]);
      }
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
      } else {
        updateZoom(zoom.target + ev.deltaY * state.zoomSpeed, state);
        executeTransitions();
      }
      ev.preventDefault();
    } else if (!mouseDown) {
      if (!state.dragging) {
        updateState({
          dragging: true,
        });
      }
      scroll.forceUpdate = true;
      if (state.layout === LayoutTypes.Fixed) {
        if (state.scrollMode !== 'vertical') {
          lastDelta = ev.deltaX * -1;
          altDelta = ev.deltaY * -1;
        } else {
          lastDelta = ev.deltaY * -1;
          altDelta = ev.deltaX * -1;
        }
        altScroll.current += altDelta;
      } else if (ev.deltaX !== 0) {
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
      if (state.layout === LayoutTypes.Fixed) {
        // Alternative Scroll
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
