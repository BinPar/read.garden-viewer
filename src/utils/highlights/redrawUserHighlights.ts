import drawHighlights from '../../lib/actions/drawHighlights';
import { DrawHighlights, LayoutTypes, State } from '../../model';

const redrawUserHighlights = async (state: State): Promise<void> => {
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
        clear: state.layout === LayoutTypes.Flow,
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
