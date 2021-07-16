import { LayoutTypes } from '../../model';

import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { DrawHighlights } from '../../model/actions/global';

import getRangesFromSelectionRanges from '../../utils/getRangesFromSelectionRanges';
import { drawHighlights as drawDomHighlights } from '../../utils/highlights';
import removeLayerHighlights from '../../utils/highlights/removeLayerHighlights';

const drawHighlights: ActionDispatcher<DrawHighlights> = async ({ action, state }) => {
  if (!state.cssLoaded || !state.wrapperReady) {
    setTimeout(() => {
      drawHighlights({ action, state });
    }, 64);
    return {};
  }
  let layer = state.highlightersLayers.get(action.key);
  if (!layer) {
    layer = document.createElement('div');
    layer.classList.add('rg-highlights-layer');
    layer.setAttribute('style', `--highlighter-color: ${action.color}`);
    state.readGardenViewerNode!.appendChild(layer);
    state.highlightersLayers.set(action.key, layer);
  }
  if (action.clear) {
    removeLayerHighlights(layer);
  }
  for (let i = 0, l = action.highlights.length; i < l; i++) {
    const highlights = action.highlights[i];
    const { key, ...selectionRange } = highlights;
    const ranges = getRangesFromSelectionRanges([selectionRange]);
    let existing = false;
    if (key) {
      const existingHighlight = layer.querySelectorAll(`[data-key="${key}"`);
      if (existingHighlight.length) {
        existing = true;
        if (state.layout === LayoutTypes.Flow) {
          existingHighlight.forEach((item) => item.remove());
        }
      }
      state.currentUserHighlights.set(key, {
        ...selectionRange,
        key,
        highlighterKey: action.key,
        color: action.color,
      });
    }
    if (!existing && ranges.length) {
      const domHighlights = drawDomHighlights(layer, ranges, true, key);
      if (domHighlights.length) {
        state.currentUserDomHighlights.set(key, domHighlights);
      }
    }
  }

  return {};
};

export default drawHighlights;
