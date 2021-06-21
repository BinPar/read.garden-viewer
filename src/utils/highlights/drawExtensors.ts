/* eslint-disable no-param-reassign */
import getSyntheticEvent from '../../lib/animation/getSyntheticEvent';
import getWordSelection from '../../lib/animation/getWordSelection';
import { getState, updateState } from '../../lib/state';
import { OnUserSelect, State } from '../../model';
import {
  clientToContentWrapperLeft,
  clientToContentWrapperTop,
} from './clientToContentWrapperCoordinates';
import drawHighlights from './drawHighlights';
import extendSelection from './extendSelection';
import removeLayerHighlights from './removeLayerHighlights';
import removeSelectionMenu from './removeSelectionMenu';

let left: HTMLDivElement | null = null;
let right: HTMLDivElement | null = null;

let onDragMove: ((ev: MouseEvent | TouchEvent) => void) | null;
let onDragEnd: ((ev: MouseEvent | TouchEvent) => void) | null;
let onScroll: ((ev: Event) => void) | null = null;

const getLeftExtensor = (): HTMLDivElement => {
  if (!left) {
    left = document.createElement('div');
    left.classList.add('rg-selection-extensor', 'rg-left-extensor');
  }
  left.classList.remove('rg-right-extensor');
  left.classList.add('rg-left-extensor');
  return left;
};

const getRightExtensor = (): HTMLDivElement => {
  if (!right) {
    right = document.createElement('div');
    right.classList.add('rg-selection-extensor', 'rg-right-extensor');
  }
  right.classList.remove('rg-left-extensor');
  right.classList.add('rg-right-extensor');
  return right;
};

const drawExtensors = (
  domHighlights: HTMLDivElement[],
  initialSelection: Range,
  state = getState(),
): void => {
  const { selectionSelectorsNode, selectionHighlightsNode } = state as Required<State>;
  removeLayerHighlights(selectionSelectorsNode);
  const leftExtensor = getLeftExtensor();
  const rightExtensor = getRightExtensor();

  let moving = false;
  let isLeft = true;

  const onDragStart = (e: Event): void => {
    e.stopImmediatePropagation();
    e.stopPropagation();
    moving = true;
    removeSelectionMenu(state);
  };

  const onLeftStart = (e: Event): void => {
    isLeft = true;
    onDragStart(e);
  };

  const onRightStart = (e: Event): void => {
    isLeft = false;
    onDragStart(e);
  };

  leftExtensor.onmousedown = onLeftStart;
  leftExtensor.ontouchstart = onLeftStart;
  rightExtensor.onmousedown = onRightStart;
  rightExtensor.ontouchstart = onRightStart;

  let currentInitial = initialSelection.cloneRange();
  let currentSelection = initialSelection.cloneRange();
  let currentHighlights = domHighlights;

  let lineHeight = 0;

  const updatePosition = (domItems: HTMLDivElement[]): void => {
    const rects = Array.from(domItems.map((hl) => hl.getBoundingClientRect()));
    const [firstRect] = rects;
    const [lastRect] = rects.slice(-1);
    leftExtensor.classList.remove('rg-right-extensor');
    leftExtensor.classList.add('rg-left-extensor');
    leftExtensor.style.top = `${clientToContentWrapperTop(firstRect.top + firstRect.height)}px`;
    leftExtensor.style.left = `${clientToContentWrapperLeft(firstRect.left - 28)}px`;
    rightExtensor.classList.remove('rg-left-extensor');
    rightExtensor.classList.add('rg-right-extensor');
    rightExtensor.style.top = `${clientToContentWrapperTop(lastRect.top + lastRect.height)}px`;
    rightExtensor.style.left = `${clientToContentWrapperLeft(lastRect.right)}px`;
    if (!lineHeight) {
      lineHeight = firstRect.height;
    }
  };

  const updateRightPosition = (domItems: HTMLDivElement[], extensor: HTMLDivElement): void => {
    const rects = Array.from(domItems.map((hl) => hl.getBoundingClientRect()));
    const [lastRect] = rects.slice(-1);
    extensor.style.top = `${clientToContentWrapperTop(lastRect.top + lastRect.height)}px`;
    extensor.style.left = `${clientToContentWrapperLeft(lastRect.right)}px`;
  };

  const updateLeftPosition = (domItems: HTMLDivElement[], extensor: HTMLDivElement): void => {
    const rects = Array.from(domItems.map((hl) => hl.getBoundingClientRect()));
    const [firstRect] = rects;
    extensor.style.top = `${clientToContentWrapperTop(firstRect.top + firstRect.height)}px`;
    extensor.style.left = `${clientToContentWrapperLeft(firstRect.left - 28)}px`;
  };

  updatePosition(domHighlights);

  onDragMove = (ev: MouseEvent | TouchEvent): void => {
    if (moving) {
      ev.stopPropagation();
      ev.stopImmediatePropagation();
      if (!state.selectingText) {
        updateState({
          selectingText: true,
        });
      }
      const event = getSyntheticEvent(ev);
      event.clientY -= lineHeight + 14;
      if (isLeft) {
        event.clientX += 14;
      } else {
        event.clientX -= 14;
      }
      const wordSelection = getWordSelection(state, ev, event, true);
      if (wordSelection) {
        const { range, hasInverted } = extendSelection(
          wordSelection,
          currentInitial,
          isLeft,
          !isLeft,
        );
        currentSelection = range;
        currentHighlights = drawHighlights(selectionHighlightsNode, [currentSelection]);
        if (hasInverted) {
          leftExtensor.classList.remove('rg-left-extensor');
          leftExtensor.classList.add('rg-right-extensor');
          rightExtensor.classList.remove('rg-right-extensor');
          rightExtensor.classList.add('rg-left-extensor');
          if (isLeft) {
            updateLeftPosition(currentHighlights, rightExtensor);
          } else {
            updateRightPosition(currentHighlights, leftExtensor);
          }
        }
      }
      if (isLeft) {
        leftExtensor.style.top = `${event.clientY + lineHeight}px`;
        leftExtensor.style.left = `${event.clientX - 14}px`;
      } else {
        rightExtensor.style.top = `${event.clientY + lineHeight}px`;
        rightExtensor.style.left = `${event.clientX}px`;
      }
    }
  };

  onDragEnd = (): void => {
    if (moving) {
      moving = false;
      updateState({
        currentSelection,
      });
      updatePosition(currentHighlights);
      currentInitial = currentSelection.cloneRange();
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
  };

  onScroll = (ev: Event): void => {
    if (moving) {
      ev.preventDefault();
    }
  };

  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('touchend', onDragEnd);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('touchmove', onDragMove);
  window.addEventListener('scroll', onScroll);

  selectionSelectorsNode.appendChild(leftExtensor);
  selectionSelectorsNode.appendChild(rightExtensor);
};

export const removeExtensors = (state = getState()): void => {
  const { selectionSelectorsNode } = state as Required<State>;
  removeLayerHighlights(selectionSelectorsNode);
  if (onScroll) {
    window.removeEventListener('scroll', onScroll);
  }
  if (onDragEnd) {
    window.removeEventListener('mouseup', onDragEnd);
    window.removeEventListener('touchend', onDragEnd);
    onDragEnd = null;
  }
  if (onDragMove) {
    window.removeEventListener('mousemove', onDragMove);
    window.removeEventListener('touchmove', onDragMove);
    onDragMove = null;
  }
};

export default drawExtensors;
