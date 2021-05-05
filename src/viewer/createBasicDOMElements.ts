import { updateState } from '../lib/state';
import { State } from '../model/state';
import setCSSProperty from './setCSSProperty';

const endingAdditionalPages = 10;

const createBasicDOMElements = (state: State): void => {
  // #region Main node
  const readGardenViewer = document.createElement('div');
  readGardenViewer.id = 'rg-viewer';
  document.body.appendChild(readGardenViewer);
  // #endregion Main node

  // #region Content Wrapper and child nodes
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('rg-content-wrapper');
  readGardenViewer.appendChild(contentWrapper);

  const totalColumnWidthCalculator = document.createElement('div');
  totalColumnWidthCalculator.classList.add('rg-total-width-calculator');
  contentWrapper.appendChild(totalColumnWidthCalculator);

  const backgroundCleaner = document.createElement('div');
  backgroundCleaner.classList.add('rg-bg-cleaner');
  contentWrapper.appendChild(backgroundCleaner);

  const additionalPage = document.createElement('div');
  additionalPage.classList.add('rg-additional-page');
  contentWrapper.appendChild(additionalPage.cloneNode(true));

  const contentPlaceholder = document.createElement('div');
  contentWrapper.appendChild(contentPlaceholder);

  const endOfChapterCalculator = document.createElement('div');
  endOfChapterCalculator.classList.add('rg-end-of-chapter-calculator');
  endOfChapterCalculator.dataset.page = '-';
  contentWrapper.appendChild(endOfChapterCalculator);

  for (let i = 0; i < endingAdditionalPages; i++) {
    const clone = additionalPage.cloneNode(true) as HTMLDivElement;
    if (i === endingAdditionalPages - 1) {
      clone.classList.add('rg-real-end-of-chapter');
      clone.textContent = 'realEndOfChapter';
    }
    contentWrapper.appendChild(clone);
  }
  // #endregion Content Wrapper and child nodes

  // #region Content Wrapper Siblings
  const pagesLabelsElement = document.createElement('div');
  pagesLabelsElement.classList.add('rg-pages-labels');
  readGardenViewer.appendChild(pagesLabelsElement);

  const selectionHighlights = document.createElement('div');
  selectionHighlights.classList.add('rg-highlights rg-selection');
  readGardenViewer.appendChild(selectionHighlights);

  const selectionSelectors = document.createElement('div');
  selectionSelectors.classList.add('rg-highlights rg-selectors');
  readGardenViewer.appendChild(selectionSelectors);

  const searchTermsHighlights = document.createElement('div');
  searchTermsHighlights.classList.add('rg-highlights rg-search');
  readGardenViewer.appendChild(searchTermsHighlights);
  // #endregion Content Wrapper Siblings

  setCSSProperty(
    'debug-viewer-safe-area',
    `${state.debugViewerSafeArea ? 1 : 0}`,
  );
  updateState({ basicDOMElementsCreated: true, readGardenViewer });
};

export default createBasicDOMElements;
