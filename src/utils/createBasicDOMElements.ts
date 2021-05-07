import { updateState } from '../lib/state';

/**
 * Creates basic DOM elements for viewer
 */
const createBasicDOMElements = (): void => {
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

  const contentPlaceholderNode = document.createElement('div');
  contentWrapperNode.appendChild(contentPlaceholderNode);

  const endOfChapterCalculatorNode = document.createElement('div');
  endOfChapterCalculatorNode.classList.add('rg-end-of-chapter-calculator');
  endOfChapterCalculatorNode.dataset.page = '-';
  contentWrapperNode.appendChild(endOfChapterCalculatorNode);

  const additionalPage = document.createElement('div');
  additionalPage.classList.add('rg-additional-page', 'rg-real-end-of-chapter');
  additionalPage.textContent = 'realEndOfChapter';
  contentWrapperNode.appendChild(additionalPage);
  // #endregion Content Wrapper and child nodes

  // #region Content Wrapper Siblings
  const pagesLabelsNode = document.createElement('div');
  pagesLabelsNode.classList.add('rg-pages-labels');
  readGardenViewerNode.appendChild(pagesLabelsNode);

  const selectionHighlightsNode = document.createElement('div');
  selectionHighlightsNode.classList.add('rg-highlights-layer', 'rg-selection');
  readGardenViewerNode.appendChild(selectionHighlightsNode);

  const selectionSelectorsNode = document.createElement('div');
  selectionSelectorsNode.classList.add('rg-highlights-layer', 'rg-selectors');
  readGardenViewerNode.appendChild(selectionSelectorsNode);

  const searchTermsHighlightsNode = document.createElement('div');
  searchTermsHighlightsNode.classList.add('rg-highlights-layer', 'rg-search');
  readGardenViewerNode.appendChild(searchTermsHighlightsNode);
  // #endregion Content Wrapper Siblings

  const dynamicStyleNode = document.createElement('link');
  dynamicStyleNode.rel = 'stylesheet';
  dynamicStyleNode.type = 'text/css';
  document.head.appendChild(dynamicStyleNode);

  const mainStylesheet = Array.from(document.styleSheets).find(
    (s) => s.href?.indexOf('read.garden-viewer.css') !== -1,
  );

  updateState({
    basicDOMElementsCreated: true,
    mainStyleNode: mainStylesheet?.ownerNode as HTMLLinkElement,
    readGardenViewerNode,
    contentWrapperNode,
    totalWidthCalculatorNode,
    contentPlaceholderNode,
    endOfChapterCalculatorNode,
    pagesLabelsNode,
    selectionHighlightsNode,
    selectionSelectorsNode,
    searchTermsHighlightsNode,
    dynamicStyleNode,
  });
};

export default createBasicDOMElements;
