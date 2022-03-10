import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { HighlightSearchTerms } from '../../model/actions/global';
import { clean, highlightTerms } from '../../utils/highlights/search';
import { updateState } from '../state';

/**
 * Highlights search terms in content
 * @param state.action Viewer action
 * @returns Partial state update
 */
// eslint-disable-next-line @typescript-eslint/require-await
const highlightSearchTerms: ActionDispatcher<HighlightSearchTerms> = async ({ state, action }) => {
  const { terms } = action;
  clean(state);
  updateState({ searchRanges: [] });
  highlightTerms(terms);
  return { searchTerms: terms };
};

export default highlightSearchTerms;
