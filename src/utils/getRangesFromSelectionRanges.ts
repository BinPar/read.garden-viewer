import { SelectionRange } from '../model/viewerSettings';
import getNodeFromQuerySelector from './getNodeFromQuerySelector';

/**
 * Converts an array of compressed selection ranges to
 * a DOM Range Array
 * @param {SelectionRange[]} selection array of compressed selection ranges
 * @returns {Range[]} array of DOM Ranges
 */
const getRangesFromSelectionRanges = (selection: SelectionRange[]): Range[] => {
  const result = new Array<Range>();
  selection.forEach((item): void => {
    const startNode = getNodeFromQuerySelector(item.start.querySelector);
    const endNode = getNodeFromQuerySelector(item.end.querySelector);
    if (startNode && endNode) {
      const range = new Range();
      range.setStart(startNode, item.start.offset);
      range.setEnd(endNode, item.end.offset);
      result.push(range);
    } else {
      console.info('No start or end node', { item, startNode, endNode });
    }
  });
  return result;
};

export default getRangesFromSelectionRanges;
