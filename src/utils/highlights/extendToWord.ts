import getSelection from '../../lib/animation/getSelection';
import getLastTextNode from '../getLastTextNode';

/**
 * Extends provided selection to get the
 * @param selection Selection
 */
const extendToWord = (selection: Selection, contentWrapper: HTMLElement): void => {
  if (!selection || !selection.rangeCount) {
    return;
  }
  const backupRange = selection.getRangeAt(0);
  selection.modify('extend', 'forward', 'word');
  let candidate = getSelection()!.getRangeAt(0);
  if (
    contentWrapper !== candidate.endContainer &&
    !contentWrapper.contains(candidate.endContainer)
  ) {
    const textNode = getLastTextNode(contentWrapper);
    if (textNode) {
      candidate.setEnd(textNode, (textNode as Text).length);
      if (
        backupRange.endOffset !== candidate.endOffset ||
        backupRange.endContainer !== candidate.endContainer
      ) {
        selection.removeAllRanges();
        selection.addRange(candidate);
        return;
      }
    }
  }
  selection.modify('extend', 'forward', 'character');
  let iteration = 0;
  while (
    ++iteration < 25 &&
    (contentWrapper === candidate.endContainer ||
      contentWrapper.contains(candidate.endContainer)) &&
    candidate.toString() !== selection.toString() &&
    !selection.toString().match(/[.,/#¡!¿?$%^&*;:{}=«»\-_`~()\][ \n]+$/)
  ) {
    candidate = getSelection()!.getRangeAt(0);
    selection.modify('extend', 'forward', 'character');
  }
  selection.removeAllRanges();
  selection.addRange(candidate);
};

export default extendToWord;
