import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { DrawHighlights } from '../../model/actions/global';

import getRangesFromSelectionRanges from '../../utils/getRangesFromSelectionRanges';
import { drawHighlights as drawDomHighlights } from '../../utils/highlights'

const drawHighlights: ActionDispatcher<DrawHighlights> = async ({ action, state }) => {
  if (!state.cssLoaded) {
    setTimeout(() => {
      drawHighlights({ action, state });
    }, 64);
    return {};
  }
  let layer = state.highlightersLayers.get(action.highlighterKey);
  if (!layer) {
    layer = document.createElement('div');
    layer.classList.add('rg-highlights-layer');
    layer.setAttribute('style', `--highlighter-color: ${action.color}`);
    state.readGardenViewerNode!.appendChild(layer);
    state.highlightersLayers.set(action.highlighterKey, layer);
  }
  const ranges = getRangesFromSelectionRanges(action.highlights);
  drawDomHighlights(layer, ranges, action.clear !== true);
  return {};
};

export default drawHighlights;
