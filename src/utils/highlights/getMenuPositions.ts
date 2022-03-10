import { LayoutTypes, MenuPosition, State } from '../../model';
import {
  clientToContentWrapperLeft,
  clientToContentWrapperTop,
} from './clientToContentWrapperCoordinates';

const getMenuPositions = (
  state: State,
  menuNeededSpace: number,
  highlightKey?: string,
  currentSelection?: Range | null,
): MenuPosition => {
  let arrowDown = true;
  let x = 0;
  let y = 0;

  let finalTop = 0;
  let top = Infinity;
  let right = 0;
  let bottom = 0;
  let left = Infinity;

  let minLeft = 0;
  let maxLeft = Infinity;

  if (state.layout === LayoutTypes.Flow && state.lastClickCoords) {
    const clickLeft = clientToContentWrapperLeft(state.lastClickCoords.x);
    minLeft = Math.floor(clickLeft / state.totalColumnWidth) * state.totalColumnWidth;
    maxLeft = minLeft + state.totalColumnWidth;
  }

  // TODO: Max left and max right for fixed

  if (highlightKey) {
    const domHighlights = state.currentUserDomHighlights.get(highlightKey);
    if (domHighlights) {
      for (let i = 0, l = domHighlights.length; i < l; i++) {
        const rect = domHighlights[i].getBoundingClientRect();
        const rectLeft = clientToContentWrapperLeft(rect.left);
        if (rectLeft < maxLeft && rectLeft >= minLeft) {
          const rectRight = clientToContentWrapperLeft(rect.right);
          left = Math.min(left, rectLeft);
          top = Math.min(top, rect.top);
          right = Math.max(right, rectRight);
          bottom = Math.max(bottom, rect.bottom);
        }
      }
      x = left + (right - left) / 2;
      finalTop = top - 15;
      y = clientToContentWrapperTop(top);
    }
  } else if (currentSelection) {
    const rects = currentSelection.getClientRects();
    for (let i = 0, l = rects.length; i < l; i++) {
      const rect = rects[i];
      const rectLeft = clientToContentWrapperLeft(rect.left);
      if (rectLeft < maxLeft && rectLeft >= minLeft) {
        const rectRight = clientToContentWrapperLeft(rect.right);
        left = Math.min(left, rectLeft);
        top = Math.min(top, rect.top);
        right = Math.max(right, rectRight);
        bottom = Math.max(bottom, rect.bottom);
      }
    }
    x = left + (right - left) / 2;
    finalTop = top - 15;
  }

  if (finalTop < menuNeededSpace) {
    if (state.containerHeight - bottom >= menuNeededSpace) {
      arrowDown = false;
      finalTop = bottom;
    } else {
      finalTop = menuNeededSpace;
    }
  }

  y = clientToContentWrapperTop(finalTop);

  return {
    left: x,
    top: y,
    arrowDown,
  };
};

export default getMenuPositions;
