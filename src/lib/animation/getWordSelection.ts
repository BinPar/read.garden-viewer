import log from 'loglevel';
import { SyntheticEvent } from '../../model/dom';

import getRangeFromPoint from './getRangeFromPoint';
import getSelection from './getSelection';
import getSyntheticEvent from './getSyntheticEvent';

const getWordSelection = (ev: MouseEvent | TouchEvent, event?: SyntheticEvent): Range | null => {
  // if (ev.type === 'touchstart') {
  //   log.warn('isSelection method is not implemented for touch events');
  //   return null;
  // }
  const selection = getSelection();
  let res: Range | null = null;
  if (selection) {
    if (ev.target) {
      const target = ev.target as HTMLElement;
      if (window.getComputedStyle(target).userSelect !== 'none') {
        const syntheticEvent = event || getSyntheticEvent(ev);
        selection.removeAllRanges();
        const rangeFromPoint = getRangeFromPoint(syntheticEvent);
        if (rangeFromPoint) {
          selection.addRange(rangeFromPoint);
          const range = selection.getRangeAt(0);
          selection.modify('move', 'backward', 'word');
          selection.modify('extend', 'forward', 'word');
          if (
            selection.toString().trim() &&
            (range.startContainer === target || target.contains(range.startContainer)) &&
            (range.endContainer === target || target.contains(range.endContainer))
          ) {
            const finalRange = selection.getRangeAt(0);
            const { left, right, top, bottom } = finalRange.getBoundingClientRect();
            if (
              left - 1 <= syntheticEvent.clientX &&
              right + 1 >= syntheticEvent.clientX &&
              top - 1 <= syntheticEvent.clientY &&
              bottom + 1 >= syntheticEvent.clientY
            ) {
              res = finalRange;
            }
          }
        }
      }
    }
  }
  return res;
};

export default getWordSelection;
