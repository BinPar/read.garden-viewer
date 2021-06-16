import { ActionDispatcher, SetHighlighterColor, UserHighlightInfo } from '../../model';

const setHighlighterColor: ActionDispatcher<SetHighlighterColor> = async ({ state, action }) => {
  const { highlightersLayers, currentUserHighlights } = state;
  const highlighterLayer = highlightersLayers.get(action.key);
  if (highlighterLayer) {
    highlighterLayer.setAttribute('style', `--highlighter-color: #${action.color}`);
  }
  const newUserHighlights = new Map<string, UserHighlightInfo>();
  currentUserHighlights.forEach((highlight, key) => {
    if (highlight.highlighterKey === action.key) {
      newUserHighlights.set(key, {
        ...highlight,
        color: `#${action.color}`,
      });
    } else {
      newUserHighlights.set(key, highlight);
    }
  });
  return {
    currentUserHighlights: newUserHighlights,
  };
};

export default setHighlighterColor;
