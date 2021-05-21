import log from 'loglevel';
import getFirstTextNode from '../../getFirstTextNode';
import getNextSibling from '../../getNextSibling';
import setCSSProperty from '../../setCSSProperty';
import extendToWord from '../extendToWord';
import cleanText from './cleanText';
import getSortedTerms from './getSortedTerms';

/**
 * Gets ranges for every appearance of provided terms
 * @param contentWrapper DOM node containing content
 * @param terms Terms to highlight
 * @returns DOM ranges
 */
const getSearchHighlightsRanges = (contentWrapper: HTMLElement, terms: string[]): Range[] => {
  const termsKey = terms.join('|');
  if (contentWrapper.dataset && contentWrapper.dataset.highlighted === termsKey) {
    return [];
  }
  if (contentWrapper.dataset) {
    // eslint-disable-next-line no-param-reassign
    contentWrapper.dataset.highlighted = termsKey;
  }
  if (!terms.length || !terms.some((t) => contentWrapper.innerText.indexOf(t) !== -1)) {
    return [];
  }
  const sortedTerms = getSortedTerms(terms);
  setCSSProperty('user-select', 'auto');
  setCSSProperty('user-select-end', 'auto');
  // Reset current caret position
  const currentSelection = window.getSelection();
  const range = document.createRange();
  if (currentSelection && range) {
    currentSelection.removeAllRanges();
    const firstTextNode = getFirstTextNode(contentWrapper) || contentWrapper;
    range.setStart(firstTextNode, 0);
    range.setEnd(firstTextNode, 0);
    currentSelection.addRange(range);
    currentSelection.modify('extend', 'forward', 'character');
    extendToWord(currentSelection);
    let searching = true;
    let rangeIsOutside = false;
    const resultRanges = new Array<Range>();
    let currentText = currentSelection.toString();
    currentText = currentText.trim().replace(/([.,/#¡!¿?$%^&*;:{}=«»\-_`~()\][])+$/g, '');

    const searchWords = sortedTerms.map((text): string[] => cleanText(text).split(' '));
    const wordsToSearch = [...searchWords.map((words): string[] => [...words])];
    const searchCurrentText = (texts: string[]): boolean =>
      texts.length > 0 && texts[0] === currentText;
    const currentRanges = searchWords.map((): Range | null => null);
    let iteratorLimit = 0;
    while (searching && !rangeIsOutside) {
      if (currentText) {
        let termFound = false;
        wordsToSearch.forEach((words, i): void => {
          if (!termFound && searchCurrentText(words)) {
            if (wordsToSearch[i].length === searchWords[i].length) {
              currentRanges[i] = currentSelection.getRangeAt(0);
            }
            words.shift();
            // Complete term has been found, now we are creating the highlight
            if (words.length === 0) {
              termFound = true;
              const endRange = currentSelection.getRangeAt(0);
              if (currentRanges[i]) {
                const selectionRange = currentRanges[i];
                currentRanges[i] = null;
                if (selectionRange) {
                  selectionRange.setEnd(endRange.endContainer, endRange.endOffset);
                  while (selectionRange.toString().match(/[.,/#¡!¿?$%^&*;:{}=«»\-_`~()\][ \n]+$/)) {
                    if (selectionRange.endOffset < 2) {
                      // Special case of empty tag selection ("[selection]<tag> ")
                      selectionRange.setEndBefore(selectionRange.endContainer);
                    } else {
                      // Ending space in same node ("[selection] ")
                      selectionRange.setEnd(
                        selectionRange.endContainer,
                        selectionRange.endOffset - 1,
                      );
                    }
                  }
                  while (selectionRange.toString().match(/^[.,/#¡!¿?$%^&*;:{}=«»\-_`~()\][ \n]+/)) {
                    if (
                      selectionRange.startContainer.nodeType === Node.TEXT_NODE &&
                      (selectionRange.startContainer as Text).length === selectionRange.startOffset
                    ) {
                      // Starting space in different node
                      const nextSibling = getNextSibling(selectionRange.startContainer);
                      const nextSiblingTextNode = nextSibling && getFirstTextNode(nextSibling);
                      if (nextSiblingTextNode) {
                        selectionRange.setStart(
                          nextSiblingTextNode,
                          0,
                        );
                      } else {
                        selectionRange.setStartAfter(selectionRange.startContainer);
                      }
                    } else {
                      // Starting space (" [selection]")
                      selectionRange.setStart(
                        selectionRange.startContainer,
                        selectionRange.startOffset + 1,
                      );
                    }
                  }
                  resultRanges.push(selectionRange);
                }
              }
              wordsToSearch[i] = [...searchWords[i]];
            }
          } else if (wordsToSearch[i].length !== searchWords[i].length) {
            currentRanges[i] = null;
            wordsToSearch[i] = [...searchWords[i]];
          }
        });
      }
      // The selected text is empty or we can find any word to highlight
      // we must keep searching
      const backupRange = window.getSelection()!.getRangeAt(0);
      currentSelection.modify('move', 'forward', 'character');
      extendToWord(currentSelection);
      let newRange = window.getSelection()!.getRangeAt(0);
      if (
        backupRange.startOffset === newRange.startOffset &&
        backupRange.startContainer === newRange.startContainer
      ) {
        // Chrome infernal loop
        currentSelection.modify('move', 'forward', 'character');
        currentSelection.modify('move', 'forward', 'character');
        currentSelection.modify('extend', 'forward', 'word');
        newRange = window.getSelection()!.getRangeAt(0);
        if (
          backupRange.startOffset === newRange.startOffset &&
          backupRange.startContainer === newRange.startContainer
        ) {
          currentSelection.modify('extend', 'forward', 'line');
        }
      }
      currentText = currentSelection.toString();
      if (iteratorLimit++ > 10000) {
        log.warn('Iteration limit reached in getSearchHighlightsRanges');
        searching = false;
      }
      currentText = currentText.trim().replace(/([.,/#¡!¿?$%^&*;:{}=«»\-_`~()\][])+$/g, '');
      const { startContainer } = currentSelection.getRangeAt(0);
      try {
        rangeIsOutside =
          contentWrapper === document.body ||
          (!contentWrapper.contains(startContainer) && contentWrapper !== startContainer);
      } catch (ex) {
        rangeIsOutside = true;
      }
    }
    currentSelection.removeAllRanges();
    setCSSProperty('user-select-end', 'none');
    return resultRanges;
  }
  return [];
};

export default getSearchHighlightsRanges;
