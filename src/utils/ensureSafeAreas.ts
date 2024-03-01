import { getState } from '../lib/state';

const ensureSafeAreas = (state = getState()): void => {
  if (state.readGardenContainerNode) {
    const areas = document.getElementsByClassName('rg-viewer-safe-area');
    if (!areas.length) {
      const safeAreaReadMode = document.createElement('div');
      safeAreaReadMode.classList.add('rg-viewer-safe-area', 'rg-read-mode-safe');
      const safeAreaUIMode = document.createElement('div');
      safeAreaUIMode.classList.add('rg-viewer-safe-area', 'rg-ui-mode-safe');
      state.readGardenContainerNode.appendChild(safeAreaReadMode);
      state.readGardenContainerNode.appendChild(safeAreaUIMode);
    }
  }
};

export default ensureSafeAreas;
