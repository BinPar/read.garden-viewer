import { getState, updateState } from '../../lib/state';

/**
 * Removes highlights from provided container
 * @param container DOM Element containing highlights
 */
const removeHighlights = (container: HTMLDivElement): void => {
  const state = getState();
  if (state.selectionMenu) {
    state.selectionMenu.remove();
  }
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = '';
  updateState({
    currentSelection: null,
    selectionMenu: null,
    lastClickCoords: undefined,
  });
};

export const removeUserHighlights = (): void => {
  const state = getState();
  state.highlightersLayers.forEach((value) => {
    removeHighlights(value);
    value.remove();
  });
  state.highlightersLayers.clear();
  state.currentUserHighlights.clear();
  state.currentUserDomHighlights.clear();
}

export default removeHighlights;
