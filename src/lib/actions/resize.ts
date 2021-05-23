import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { Resize } from '../../model/actions/global';
import checkCurrentPage from '../../utils/checkCurrentPage';
import { drawHighlights } from '../../utils/highlights';
import { clean } from '../../utils/highlights/search';
import setCSSProperty from '../../utils/setCSSProperty';

import recalculate from '../../viewer/recalculate';

/**
 * Resize action
 * @param context.state Viewer state
 */
const resize: ActionDispatcher<Resize> = async ({ state }) => {
  setCSSProperty('viewer-margin-top', '200vh');
  clean();
  const recalculateUpdate = await recalculate(state);
  if (recalculateUpdate.recalculating === false) {
    setCSSProperty('viewer-margin-top', '0');
  }
  if (state.searchRanges.length && state.searchTermsHighlightsNode) {
    drawHighlights(state.searchTermsHighlightsNode, state.searchRanges);
  }
  checkCurrentPage();
  return recalculateUpdate;
};

export default resize;
