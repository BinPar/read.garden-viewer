/**
 * Extends provided selection to get the 
 * @param selection Selection
 */
const extendToWord = (selection: Selection): void => {
  selection.modify('extend', 'forward', 'word');
  let candidate = window.getSelection()!.getRangeAt(0);
  selection.modify('extend', 'forward', 'character');
  let iteration = 0;
  while (
    ++iteration < 25 &&
    candidate.toString() !== selection.toString() &&
    !selection.toString().match(/[.,/#¡!¿?$%^&*;:{}=«»\-_`~()\][ \n]+$/)
  ) {
    candidate = window.getSelection()!.getRangeAt(0);
    selection.modify('extend', 'forward', 'character');
  }
  selection.removeAllRanges();
  selection.addRange(candidate);
};

export default extendToWord;
