/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SetReadMode } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/actions/common';
import { SelectionInfo, SyntheticEvent } from '../../model/dom';
import { FixedState, GlobalState, PaginatedState, ScrolledState, State } from '../../model/state';
import { drawHighlights } from '../../utils/highlights';
import setCSSProperty from '../../utils/setCSSProperty';
import { updateState } from '../state';
import getCoordinatesFromEvent from './getCoordinatesFromEvent';
import getMinAndMaxScroll, { getMinAndMaxAltScroll } from './getMinAndMaxScroll';
import getSyntheticEvent from './getSyntheticEvent';
import { InterpolationValue, zoom, scale, altScroll, scroll } from './interpolationValues';
import getWordSelection from './getWordSelection';
import scrollInertiaAndLimits from './scrollInertiaAndLimits';
import { LayoutTypes } from '../../model/viewerSettings';
import updateZoom from './updateZoom';
import { OnHighlightClick, OnUserSelect } from '../../model/events';
import getClickedHighlight from './getClickedHighlight';
import removeSelectionMenu from '../../utils/highlights/removeSelectionMenu';
import removeNotesDialog from '../../utils/highlights/removeNotesDialog';
import drawExtensors, { removeExtensors } from '../../utils/highlights/drawExtensors';
import extendSelection from '../../utils/highlights/extendSelection';
import clearNativeSelection from '../../utils/highlights/clearNativeSelection';
import clearSelection from '../../utils/highlights/clearSelection';
import getFixedContentContainer from '../../utils/highlights/getFixedContentContainer';
import isClickOnLink from '../../utils/highlights/isClickOnLink';

export const reCalcScrollLimits = (
  state: (GlobalState & FixedState & ScrolledState) | (GlobalState & FixedState & PaginatedState),
): void => {
  const scrollLimits = getMinAndMaxScroll(state);
  if (scroll.current > scrollLimits.maxScroll) {
    scroll.target = scrollLimits.maxScroll;
    scroll.speed = 0;
  } else if (scroll.target < scrollLimits.minScroll) {
    scroll.target = scrollLimits.minScroll;
    scroll.speed = 0;
  }
  const altScrollLimits = getMinAndMaxAltScroll(state);
  if (altScroll.current > altScrollLimits.maxScroll) {
    altScroll.target = altScrollLimits.maxScroll;
    altScroll.speed = 0;
  } else if (altScroll.target < altScrollLimits.minScroll) {
    altScroll.target = altScrollLimits.minScroll;
    altScroll.speed = 0;
  }
};

const scrollController = (
  state: State,
  dispatch: DispatchAPIAction,
  executeTransitions: () => void,
): void => {
  let mouseDown = false;
  let lastDelta = 0;
  let altDelta = 0;
  let lastX: null | number = null;
  let lastY: null | number = null;
  let lastMoveMilliseconds: number = new Date().getTime();

  const { selectionHighlightsNode } = state as Required<State>;
  let initialSelection: SelectionInfo | null = null;
  let currentSelection: Range | null = null;
  let isSelecting = false;
  let mobileSelection = false;
  let mobileSelectionTimeout: NodeJS.Timeout | null = null;

  const onDragStart = (ev: MouseEvent | TouchEvent): void => {
    clearSelection();
    removeExtensors(state);
    removeSelectionMenu(state);
    removeNotesDialog(state);
    if (ev.type === 'touchstart' || (ev as MouseEvent).button === 0) {
      setCSSProperty('user-select', 'none');
      initialSelection = null;
      currentSelection = null;
      isSelecting = false;
      const syntheticEvent = getSyntheticEvent(ev);
      const isLink = isClickOnLink(syntheticEvent, state);
      if (isLink) {
        return;
      }
      const clickedHighlight =
        !state.config.disableSelection &&
        state.config.eventHandler &&
        getClickedHighlight(ev, syntheticEvent);
      if (clickedHighlight) {
        const userHighlightInfo = state.currentUserHighlights.get(clickedHighlight)!;
        if (userHighlightInfo) {
          const { start, end, obfuscatedText } = userHighlightInfo;
          const onHighlightClick: OnHighlightClick = {
            type: 'onHighlightClick',
            slug: state.slug,
            key: clickedHighlight,
            ranges: [{ start, end, obfuscatedText }],
          };
          const handler = state.config.eventHandler!;
          handler(onHighlightClick);
          updateState({
            lastClickCoords: { x: syntheticEvent.clientX, y: syntheticEvent.clientY },
            highlightClicked: true,
          });
          return;
        }
      }
      setCSSProperty('user-select', 'text');
      const wordSelection =
        !state.config.disableSelection && getWordSelection(state, ev, syntheticEvent);
      // alert(JSON.stringify({ ...syntheticEvent, wordSelection: !!wordSelection }));
      setCSSProperty('user-select', 'none');
      if (wordSelection) {
        ev.stopPropagation();
        initialSelection = {
          startContainer: wordSelection.startContainer,
          startOffset: wordSelection.startOffset,
          endContainer: wordSelection.endContainer,
          endOffset: wordSelection.endOffset,
        };
        if (ev.type === 'touchstart') {
          mobileSelectionTimeout = setTimeout(() => {
            mobileSelection = true;
            mobileSelectionTimeout = null;
            currentSelection = wordSelection;
            updateState({
              selectingText: true,
            });
          }, 400);
        } else {
          ev.preventDefault();
          isSelecting = true;
          return;
        }
      }
      mouseDown = true;
      lastX = null;
      lastY = null;
      lastDelta = 0;
      altDelta = 0;
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
    if (mobileSelectionTimeout) {
      clearTimeout(mobileSelectionTimeout);
      mobileSelectionTimeout = null;
    }
    if (mouseDown) {
      mouseDown = false;
      let inertialDelta = lastDelta;
      let altInertialDelta = altDelta;
      updateScrollDeltas(ev);
      const timeFromLastMove = new Date().getTime() - lastMoveMilliseconds;

      if (lastDelta || timeFromLastMove > 100) {
        if (Math.sign(lastDelta) === Math.sign(inertialDelta)) {
          inertialDelta = lastDelta;
        } else if (timeFromLastMove > 100) {
          inertialDelta = 0;
        }
      }
      scroll.target = scroll.current + inertialDelta * state.animationInertia;
      scrollInertiaAndLimits(state, scroll, inertialDelta, executeTransitions, dispatch);
      if (state.layout === LayoutTypes.Fixed) {
        if (altDelta || timeFromLastMove > 100) {
          if (Math.sign(altDelta) === Math.sign(altInertialDelta)) {
            altInertialDelta = altDelta;
          } else if (timeFromLastMove > 100) {
            altInertialDelta = 0;
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
        if (!state.animating) {
          setCSSProperty('pointer-events', 'auto');
          setCSSProperty('user-select', 'auto');
        }
      }, 0);
    }
    if (initialSelection && currentSelection) {
      ev.preventDefault();
      updateState({
        currentSelection,
      });
      if (mobileSelection) {
        const highlights = drawHighlights(selectionHighlightsNode, [currentSelection]);
        mobileSelection = false;
        drawExtensors(highlights, currentSelection, state);
      } else {
        const syntheticEvent = getSyntheticEvent(ev);
        updateState({
          lastClickCoords: { x: syntheticEvent.clientX, y: syntheticEvent.clientY },
        });
        drawHighlights(selectionHighlightsNode, [currentSelection]);
      }
      setCSSProperty('user-select', 'none');
      clearNativeSelection();
      setTimeout((): void => {
        updateState({
          selectingText: false,
        });
      }, 0);
      if (
        !currentSelection.collapsed &&
        currentSelection.toString().trim() &&
        state.config.eventHandler
      ) {
        const event: OnUserSelect = {
          type: 'onUserSelect',
          slug: state.slug,
        };
        state.config.eventHandler(event);
      }
    }
    if (state.highlightClicked) {
      setTimeout(() => {
        updateState({ highlightClicked: false });
      }, 0);
    }
    initialSelection = null;
    currentSelection = null;
    mobileSelection = false;
    isSelecting = false;
  };

  const onDragMove = (ev: MouseEvent | TouchEvent): void => {
    if (mobileSelectionTimeout) {
      updateState({
        selectingText: false,
      });
      clearTimeout(mobileSelectionTimeout);
      mobileSelectionTimeout = null;
      mobileSelection = false;
    }
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
      lastMoveMilliseconds = new Date().getTime();
    }
    if (isSelecting && initialSelection) {
      setCSSProperty('user-select', 'text');
      if (!state.selectingText) {
        updateState({
          selectingText: true,
        });
      }
      const event = getSyntheticEvent(ev);
      const wordSelection = getWordSelection(state, ev, event);
      if (wordSelection) {
        const container =
          state.layout === LayoutTypes.Fixed &&
          getFixedContentContainer(wordSelection.startContainer);
        if (!container || container.contains(initialSelection.startContainer)) {
          const { range } = extendSelection(wordSelection, initialSelection);
          currentSelection = range;
          drawHighlights(selectionHighlightsNode, [currentSelection]);
        }
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
        updateState({ fitMode: undefined });
        updateZoom(zoom.target - ev.deltaY * state.zoomSpeed, state);
        reCalcScrollLimits(state);
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
        const altScrollLimits = getMinAndMaxAltScroll(state);
        if (altScroll.current > altScrollLimits.maxScroll) {
          altScroll.current = altScrollLimits.maxScroll;
          altScroll.speed = 0;
          altDelta = 0;
        } else if (altScroll.current < altScrollLimits.minScroll) {
          altScroll.current = altScrollLimits.minScroll;
          altScroll.speed = 0;
          altDelta = 0;
        }
        altScroll.target = altScroll.current;
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
