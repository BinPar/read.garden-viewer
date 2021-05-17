import log from 'loglevel';

import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { HighlightSearchTerms } from '../../model/actions/global';
import { highlightTerms } from '../../utils/highlights/search';

/**
 * Highlights search terms in content
 * @param state.action Viewer action 
 * @returns Partial state update
 */
const highlightSearchTerms: ActionDispatcher<HighlightSearchTerms> = async ({ action }) => {
  log.info('Highlight terms', action.terms);
  const { terms } = action;
  highlightTerms(terms);
  return { searchTerms: terms };
};

export default highlightSearchTerms;
