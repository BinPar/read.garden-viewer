import { LayoutTypes } from '../../model';
import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { Resize } from '../../model/actions/global';
import { drawHighlights } from '../../utils/highlights';
import redrawUserHighlights from '../../utils/highlights/redrawUserHighlights';
import removeUserHighlights from '../../utils/highlights/removeUserHighlights';
import { clean } from '../../utils/highlights/search';
import setCSSProperty from '../../utils/setCSSProperty';

import recalculate from '../../viewer/recalculate';

/**
 * Resize action
 * @param context.state Viewer state
 */
const resize: ActionDispatcher<Resize> = async ({ state }) => {
  if (state.layout === LayoutTypes.Flow) {
    setCSSProperty('viewer-margin-top', '200vh');
    clean(state);
    removeUserHighlights(state);
    const recalculateUpdate = await recalculate(state);
    if (recalculateUpdate.recalculating === false) {
      setCSSProperty('viewer-margin-top', '0');
    }
    if (state.searchRanges.length && state.searchTermsHighlightsNode) {
      drawHighlights(state.searchTermsHighlightsNode, state.searchRanges);
    }
    await redrawUserHighlights(state);
    return recalculateUpdate;
  }
  return {};
};

export default resize;
