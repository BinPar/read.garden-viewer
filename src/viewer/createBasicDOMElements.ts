import { updateState } from '../lib/state';
import { State } from '../model/state';
import setCSSProperty from './setCSSProperty';

const endingAdditionalPages = 10;

const createBasicDOMElements = (state: State): void => {
  // #region Main node
  const readGardenViewerNode = document.createElement('div');
  readGardenViewerNode.id = 'rg-viewer';
  document.body.appendChild(readGardenViewerNode);
  // #endregion Main node

  // #region Content Wrapper and child nodes
  const contentWrapperNode = document.createElement('div');
  contentWrapperNode.classList.add('rg-content-wrapper');
  readGardenViewerNode.appendChild(contentWrapperNode);

  const totalWidthCalculatorNode = document.createElement('div');
  totalWidthCalculatorNode.classList.add('rg-total-width-calculator');
  contentWrapperNode.appendChild(totalWidthCalculatorNode);

  const backgroundCleaner = document.createElement('div');
  backgroundCleaner.classList.add('rg-bg-cleaner');
  contentWrapperNode.appendChild(backgroundCleaner);

  const additionalPage = document.createElement('div');
  additionalPage.classList.add('rg-additional-page');
  contentWrapperNode.appendChild(additionalPage.cloneNode(true));

  const contentPlaceholderNode = document.createElement('div');
  contentWrapperNode.appendChild(contentPlaceholderNode);

  const endOfChapterCalculatorNode = document.createElement('div');
  endOfChapterCalculatorNode.classList.add('rg-end-of-chapter-calculator');
  endOfChapterCalculatorNode.dataset.page = '-';
  contentWrapperNode.appendChild(endOfChapterCalculatorNode);

  for (let i = 0; i < endingAdditionalPages; i++) {
    const clone = additionalPage.cloneNode(true) as HTMLDivElement;
    if (i === endingAdditionalPages - 1) {
      clone.classList.add('rg-real-end-of-chapter');
      clone.textContent = 'realEndOfChapter';
    }
    contentWrapperNode.appendChild(clone);
  }
  // #endregion Content Wrapper and child nodes

  // #region Content Wrapper Siblings
  const pagesLabelsNode = document.createElement('div');
  pagesLabelsNode.classList.add('rg-pages-labels');
  readGardenViewerNode.appendChild(pagesLabelsNode);

  const selectionHighlightsNode = document.createElement('div');
  selectionHighlightsNode.classList.add('rg-highlights', 'rg-selection');
  readGardenViewerNode.appendChild(selectionHighlightsNode);

  const selectionSelectorsNode = document.createElement('div');
  selectionSelectorsNode.classList.add('rg-highlights', 'rg-selectors');
  readGardenViewerNode.appendChild(selectionSelectorsNode);

  const searchTermsHighlightsNode = document.createElement('div');
  searchTermsHighlightsNode.classList.add('rg-highlights', 'rg-search');
  readGardenViewerNode.appendChild(searchTermsHighlightsNode);
  // #endregion Content Wrapper Siblings

  setCSSProperty(
    'debug-viewer-safe-area',
    `${state.debugViewerSafeArea ? 1 : 0}`,
  );
  updateState({
    basicDOMElementsCreated: true,
    readGardenViewerNode,
    contentWrapperNode,
    totalWidthCalculatorNode,
    contentPlaceholderNode,
    endOfChapterCalculatorNode,
    pagesLabelsNode,
    selectionHighlightsNode,
    selectionSelectorsNode,
    searchTermsHighlightsNode,
  });
};

export default createBasicDOMElements;
