import { LayoutTypes } from '../../model';
import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { Resize } from '../../model/actions/global';

import getMargins from '../../utils/getMargins';
import { drawHighlights } from '../../utils/highlights';
import redrawUserHighlights from '../../utils/highlights/redrawUserHighlights';
import removeUserHighlights from '../../utils/highlights/removeUserHighlights';
import { clean } from '../../utils/highlights/search';
import setCSSProperty from '../../utils/setCSSProperty';
import updateSafeAreaVariables from '../../utils/updateSafeAreaVariables';
import recalculate from '../../viewer/recalculate';
import { updateState } from '../state';

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
    updateSafeAreaVariables();
    if (state.searchRanges.length && state.searchTermsHighlightsNode) {
      drawHighlights(state.searchTermsHighlightsNode, state.searchRanges);
    }
    await redrawUserHighlights(state);
    return recalculateUpdate;
  }

  if (state.layout === LayoutTypes.Fixed) {
    const { readGardenContainerNode } = state;
    if (readGardenContainerNode) {
      const { width: containerWidth, height: containerHeight } =
        readGardenContainerNode.getBoundingClientRect();
      const margin = getMargins({ config: state.config, containerWidth, readMode: state.readMode });
      updateState({ containerWidth, containerHeight, margin });
      const { fitMode } = state;
      if (fitMode) {
        updateState({ fitMode: undefined });
        updateState({ fitMode });
      }
      updateSafeAreaVariables();
    }
  }
  return {};
};

export default resize;
