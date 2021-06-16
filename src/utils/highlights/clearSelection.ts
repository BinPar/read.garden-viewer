import { getState } from '../../lib/state';
import removeLayerHighlights from './removeLayerHighlights';

const clearSelection = (state = getState()): void => {
  if (state.selectionHighlightsNode) {
    removeLayerHighlights(state.selectionHighlightsNode);
  }
};

export default clearSelection;
