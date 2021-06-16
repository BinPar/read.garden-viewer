import { getState } from '../../../lib/state';
import removeLayerHighlights from '../removeLayerHighlights';

/**
 * Cleans search highlights
 */
const clean = (): void => {
  const state = getState();
  if (state.searchTermsHighlightsNode) {
    removeLayerHighlights(state.searchTermsHighlightsNode);
  }
  if (state.contentWrapperNode) {
    state.contentWrapperNode.querySelectorAll('[data-highlighted]').forEach((element) => {
      element.removeAttribute('data-highlighted');
    });
  }
};

export default clean;