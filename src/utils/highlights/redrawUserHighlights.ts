import { DrawHighlights, LayoutTypes } from '../../model';

import drawHighlights from '../../lib/actions/drawHighlights';
import { getState } from '../../lib/state';

const redrawUserHighlights = async (state = getState(), clear = false): Promise<void> => {
  const { currentUserHighlights } = state;
  const actions = new Map<string, DrawHighlights>();
  currentUserHighlights.forEach((highlightInfo) => {
    let drawAction = actions.get(highlightInfo.highlighterKey);
    if (!drawAction) {
      drawAction = {
        type: 'drawHighlights',
        color: highlightInfo.color,
        key: highlightInfo.highlighterKey,
        highlights: [],
        clear: clear || state.layout === LayoutTypes.Flow,
      };
      actions.set(highlightInfo.highlighterKey, drawAction);
    }
    drawAction.highlights.push({
      key: highlightInfo.key,
      start: highlightInfo.start,
      end: highlightInfo.end,
      obfuscatedText: highlightInfo.obfuscatedText,
    });
  });
  await Promise.all(
    Array.from(actions.values()).map((action) => drawHighlights({ action, state })),
  );
};

export default redrawUserHighlights;
