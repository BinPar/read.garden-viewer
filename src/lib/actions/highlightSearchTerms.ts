import log from 'loglevel';

import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { HighlightSearchTerms } from '../../model/actions/global';
import { State } from '../../model/state';
import { getSearchHighlightsRanges } from '../../utils/highlights/search';
import { drawHighlights } from '../../utils/highlights';

const highlightSearchTerms: ActionDispatcher<HighlightSearchTerms> = async ({ state, action }) => {
  log.info('Highlight terms', action.terms);

  const { contentWrapperNode, searchTermsHighlightsNode } = state as Required<State>;
  const { terms } = action;

  const ranges = getSearchHighlightsRanges(contentWrapperNode, terms);
  log.info('Highlight ranges', ranges.length);
  drawHighlights(searchTermsHighlightsNode, ranges);

  return { searchTerms: terms };
};

export default highlightSearchTerms;
