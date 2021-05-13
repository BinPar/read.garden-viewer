import log from 'loglevel';
import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { HighlightSearchTerms } from '../../model/actions/global';

const highlightSearchTerms: ActionDispatcher<HighlightSearchTerms> = async ({ action }) => {
  log.info('Highlight terms', action.terms);
  return {};
};

export default highlightSearchTerms;
