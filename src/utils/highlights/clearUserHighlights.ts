import { getState } from '../../lib/state';

const clearUserHighlights = (state = getState()): void => {
  state.highlightersLayers.clear();
  state.currentUserHighlights.clear();
  state.currentUserDomHighlights.clear();
};

export default clearUserHighlights;
