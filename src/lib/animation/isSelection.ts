import log from 'loglevel';

import getRangeFromPoint from './getRangeFromPoint';
import getSelection from './getSelection';
import getSyntheticEvent from './getSyntheticEvent';

const isSelection = (ev: MouseEvent | TouchEvent): boolean => {
  if (ev.type === 'touchstart') {
    log.warn('isSelection method is not implemented for touch events');
    return false;
  }
  const selection = getSelection();
  if (selection) {
    if (ev.target) {
      const target = ev.target as HTMLElement;
      if (window.getComputedStyle(target).userSelect === 'none') {
        return false;
      }
      const event = getSyntheticEvent(ev);
      selection.removeAllRanges();
      selection.addRange(getRangeFromPoint(event));
      const range = selection.getRangeAt(0);
      selection.modify('move', 'backward', 'word');
      selection.modify('extend', 'forward', 'word');
      if (
        selection.toString().trim() &&
        (range.startContainer === target || target.contains(range.startContainer)) &&
        (range.endContainer === target || target.contains(range.endContainer))
      ) {
        const { left, right, top, bottom } = selection.getRangeAt(0).getBoundingClientRect();
        if (
          left - 1 <= event.clientX &&
          right + 1 >= event.clientX &&
          top - 1 <= event.clientY &&
          bottom + 1 >= event.clientY
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

export default isSelection;
