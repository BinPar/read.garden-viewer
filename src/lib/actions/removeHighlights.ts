import { ActionDispatcher, RemoveHighlights } from '../../model';

// eslint-disable-next-line @typescript-eslint/require-await
const removeHighlights: ActionDispatcher<RemoveHighlights> = async ({ action, state }) => {
  action.keys.forEach((key) => {
    const highlights = state.currentUserDomHighlights.get(key);
    if (highlights) {
      highlights.forEach((hl) => {
        hl.remove();
      });
    }
    state.currentUserHighlights.delete(key);
    state.currentUserDomHighlights.delete(key);
  });
  return {};
};

export default removeHighlights;
