import log from 'loglevel';
import setCSSProperty from '../../setCSSProperty';
import cleanText from './cleanText';
import getSortedTerms from './getSortedTerms';

/**
 * Gets ranges for every appearance of provided terms
 * @param contentWrapper DOM node containing content
 * @param terms Terms to highlight
 * @returns DOM ranges
 */
const getSearchHighlightsRanges = (
  contentWrapper: HTMLDivElement,
  terms: string[],
): Range[] => {
  const sortedTerms = getSortedTerms(terms);
  setCSSProperty('user-select', 'auto');
  setCSSProperty('user-select-end', 'auto');
  // Reset current caret position
  const currentSelection = window.getSelection();
  const range = document.createRange();
  if (currentSelection && range && contentWrapper) {
    const modifySelection = (...args: string[]): void => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (currentSelection as any).modify(...args);
    };
    currentSelection.removeAllRanges();
    range.setStart(contentWrapper, 0);
    range.setEnd(contentWrapper, 0);
    currentSelection.addRange(range);
    modifySelection('extend', 'forward', 'character');
    modifySelection('extend', 'forward', 'word');
    let searching = true;
    const resultRanges = new Array<Range>();
    let currentText = '';

    const searchWords = sortedTerms.map((text): string[] => cleanText(text).split(' '));
    const wordsToSearch = [...searchWords.map((words): string[] => [...words])];
    const searchCurrentText = (texts: string[]): boolean =>
      texts.length > 0 && texts[0] === currentText;
    const currentRanges = searchWords.map((): Range | null => null);
    let iteratorLimit = 0;
    while (searching) {
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
                  while (selectionRange.toString().match(/[.,/#¡!¿?$%^&*;:{}=«»\-_`~()\][ ]+$/)) {
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
                  while (selectionRange.toString().match(/^[.,/#¡!¿?$%^&*;:{}=«»\-_`~()\][ ]+/)) {
                    // Starting space (" [selection]")
                    // Starting space in different tag?
                    selectionRange.setStart(
                      selectionRange.startContainer,
                      selectionRange.startOffset + 1,
                    );
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
      modifySelection('move', 'forward', 'character');
      modifySelection('extend', 'forward', 'word');
      let newRange = window.getSelection()!.getRangeAt(0);
      if (
        backupRange.startOffset === newRange.startOffset &&
        backupRange.startContainer === newRange.startContainer
      ) {
        // Chrome infernal loop
        modifySelection('move', 'forward', 'character');
        modifySelection('move', 'forward', 'character');
        modifySelection('extend', 'forward', 'word');
        newRange = window.getSelection()!.getRangeAt(0);
        if (
          backupRange.startOffset === newRange.startOffset &&
          backupRange.startContainer === newRange.startContainer
        ) {
          modifySelection('extend', 'forward', 'line');
        }
      }
      currentText = currentSelection.toString();
      if (currentText.trim().startsWith('realEndOfChapter') || iteratorLimit++ > 10000) {
        if (iteratorLimit > 10000) {
          log.warn('Iteration limit reached in getSearchHighlightsRanges');
        }
        searching = false;
      }
      currentText = currentText.trim().replace(/([.,/#¡!¿?$%^&*;:{}=«»\-_`~()\][])+$/g, '');
    }
    currentSelection.removeAllRanges();
    setCSSProperty('user-select-end', 'none');
    return resultRanges;
  }
  return [];
};

export default getSearchHighlightsRanges;