import { SelectionPointer, SelectionRange } from '../model/viewerSettings';
import getQuerySelectorFromNode from './getQuerySelectorFromNode';

/**
 * Gets a selection Range from a DOM Selection
 * @param {Range} selection DOM Selection used to generate the range
 * or null for empty selection
 * @returns {SelectionRange} Resulting selection range
 */
const getSelectionRangeFromSelection = (selection: Range): SelectionRange => {
  const start: SelectionPointer = {
    offset: selection.startOffset,
    querySelector: getQuerySelectorFromNode(selection.startContainer),
  };
  const end: SelectionPointer = {
    offset: selection.endOffset,
    querySelector: getQuerySelectorFromNode(selection.endContainer),
  };

  return {
    obfuscatedText: selection.toString(),
    start,
    end,
  };
};

export default getSelectionRangeFromSelection;
