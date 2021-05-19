import log from 'loglevel';

import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { HighlightSearchTerms } from '../../model/actions/global';
import { highlightTerms } from '../../utils/highlights/search';

/**
 * Highlights search terms in content
 * @param state.action Viewer action 
 * @returns Partial state update
 */
const highlightSearchTerms: ActionDispatcher<HighlightSearchTerms> = async ({ state, action }) => {
  log.info('Highlight terms', action.terms);
  const { terms } = action;
  const { contentWrapperNode, searchTermsHighlightsNode } = state;
  if (contentWrapperNode) {
    contentWrapperNode.querySelectorAll('[data-highlighted]').forEach((element) => {
      element.removeAttribute('data-highlighted');
    });
  }
  if (searchTermsHighlightsNode) {
    searchTermsHighlightsNode.innerHTML = '';
  }
  highlightTerms(terms);
  return { searchTerms: terms };
};

export default highlightSearchTerms;
