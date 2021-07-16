/* eslint-disable no-bitwise */
import { SelectionInfo } from '../../model/dom';

const isPreviousThanSelection = (
  range: Range,
  initialSelection: SelectionInfo,
  isLeftExtensor: boolean,
): boolean => {
  if (range.startContainer === initialSelection.startContainer) {
    if (isLeftExtensor && range.endContainer === initialSelection.endContainer) {
      return range.endOffset <= initialSelection.endOffset;
    }
    return range.startOffset <= initialSelection.startOffset;
  }
  return !!(
    range.startContainer.compareDocumentPosition(initialSelection.startContainer) &
    Node.DOCUMENT_POSITION_FOLLOWING
  );
};

const extendSelection = (
  wordSelection: Range,
  initialSelection: SelectionInfo,
  isLeftExtensor = false,
  isRightExtensor = false,
): { hasInverted: boolean; range: Range } => {
  const isPrevious = isPreviousThanSelection(wordSelection, initialSelection, isLeftExtensor);
  const { startContainer, startOffset, endContainer, endOffset } = initialSelection;
  let hasInverted = false;
  if (isPrevious) {
    if (isRightExtensor) {
      if (
        startContainer === wordSelection.startContainer &&
        startOffset === wordSelection.startOffset
      ) {
        // Word selection is not previous and starts like current selection, so we don't change it
      } else {
        wordSelection.setStart(wordSelection.startContainer, wordSelection.startOffset);
        wordSelection.setEnd(startContainer, startOffset > 1 ? startOffset - 1 : startOffset);
        hasInverted = true;
      }
    } else {
      wordSelection.setEnd(endContainer, endOffset);
    }
  } else if (isLeftExtensor) {
    try {
      wordSelection.setStart(endContainer, endOffset + 1);
    } catch {
      wordSelection.setStart(endContainer, endOffset);
    }
    wordSelection.setEnd(wordSelection.endContainer, wordSelection.endOffset);
    hasInverted = true;
  } else {
    wordSelection.setStart(startContainer, startOffset);
  }
  return { hasInverted, range: wordSelection };
};

export default extendSelection;
