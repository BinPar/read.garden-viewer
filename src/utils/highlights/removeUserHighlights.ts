import { getState } from '../../lib/state';
import removeLayerHighlights from './removeLayerHighlights';

const removeUserHighlights = (state = getState()): void => {
  state.highlightersLayers.forEach((value) => {
    removeLayerHighlights(value);
    value.remove();
  });
};

export default removeUserHighlights;