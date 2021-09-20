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
      const targetStyle = window.getComputedStyle(target);
      if (
        force ||
        (contentPlaceholderNode?.contains(target) && targetStyle.userSelect !== 'none')
      ) {
        const syntheticEvent = event || getSyntheticEvent(ev);
        selection.removeAllRanges();
        const rangeFromPoint = getRangeFromPoint(syntheticEvent);
        if (rangeFromPoint) {
          selection.addRange(rangeFromPoint.cloneRange());
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
            const { clientX, clientY } = syntheticEvent;
            if (
              (left - 1 <= clientX &&
                right + 1 >= clientX &&
                top - 1 <= clientY &&
                bottom + 1 >= clientY) ||
              (state.layout === 'fixed' &&
                targetStyle.cursor === 'text' &&
                clientX > right &&
                clientY < bottom &&
                clientY > top)
            ) {
              res = finalRange;
            } else if (
              state.layout === 'fixed' &&
              targetStyle.cursor === 'text' &&
              clientX < left &&
              clientY > bottom
            ) {
              selection.removeAllRanges();
              selection.addRange(rangeFromPoint.cloneRange());
              const newPointRange = selection.getRangeAt(0);
              selection.modify('extend', 'forward', 'word');
              if (
                selection.toString().trim() &&
                (force ||
                  ((newPointRange.startContainer === target ||
                    target.contains(newPointRange.startContainer)) &&
                    (newPointRange.endContainer === target ||
                      target.contains(newPointRange.endContainer))))
              ) {
                const fixedRange = selection.getRangeAt(0);
                const fixedRect = fixedRange.getBoundingClientRect();
                if (
                  fixedRect.left - 1 <= clientX &&
                  fixedRect.right + 1 >= clientX &&
                  fixedRect.top - 1 <= clientY &&
                  fixedRect.bottom + 1 >= clientY
                ) {
                  res = fixedRange;
                }
              }
            }
          }
        }
      }
    }
  }
  return res;
};

export default getWordSelection;
