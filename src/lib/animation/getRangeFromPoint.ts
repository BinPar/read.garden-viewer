import { SyntheticEvent } from '../../model/dom';
import getSelection from './getSelection';

/**
 * This is crazy... the selection from point is not standard jet
 * it took some time to figure out how to do it in the different
 * browsers (old scroll JS) but I think that it covers every browser 
 * (at least for the Bi-Books needs), if anyone detects any improvement
 * for any browser please do a pool request
 * @param {SyntheticEvent} evt - Mouse event to do the selection
 * @returns Selection Range
 */
const getRangeFromPoint = (evt: SyntheticEvent, extendToWord = false): Range => {
  let range: any;
  const x = evt.clientX;
  const y = evt.clientY;

  const body = document.body as any;

  // Try the simple IE way first
  if (body.createTextRange) {
    range = body.createTextRange();
    range.moveToPoint(x, y);
  } else if (typeof document.createRange !== "undefined") {
    // Try Mozilla's rangeOffset and rangeParent properties, which are exactly what we want
    if (typeof evt.rangeParent !== "undefined") {
      range = document.createRange();
      range.setStart(evt.rangeParent, evt.rangeOffset);
      range.collapse(true);
    }

    // Try the standards-based way next
    else if (document.caretPositionFromPoint) {
      const pos = document.caretPositionFromPoint(x, y) as any;
      range = document.createRange();
      range.setStart(pos.offsetNode, pos.offset);
      range.collapse(true);
    }

    // Next, the WebKit way
    else if (document.caretRangeFromPoint) {
      range = document.caretRangeFromPoint(x, y);
    }
  }
  if (extendToWord) {
    const selection = getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range as Range);
      selection.modify('move', 'backward', 'word');
      selection.modify('extend', 'forward', 'word');
      console.log(selection.toString());
      return selection.getRangeAt(0);
    }
  }
  return range as Range;
}

export default getRangeFromPoint;