import { SyntheticEvent } from '../../model/dom';
import { State } from '../../model/state';

import getRangeFromPoint from './getRangeFromPoint';
import getSelection from './getSelection';
import getSyntheticEvent from './getSyntheticEvent';

const getWordSelection = (
  state: State,
  ev: MouseEvent | TouchEvent,
  event?: SyntheticEvent,
  force = false,
): Range | null => {
  const selection = getSelection();
  let res: Range | null = null;
  if (selection) {
    if (ev.target) {
      const { contentPlaceholderNode } = state;
      const target = ev.target as HTMLElement;
      if (
        force ||
        (contentPlaceholderNode?.contains(target) &&
          window.getComputedStyle(target).userSelect !== 'none')
      ) {
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
            (force ||
              ((range.startContainer === target || target.contains(range.startContainer)) &&
                (range.endContainer === target || target.contains(range.endContainer))))
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
