import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetDebugViewerSafeArea } from '../../model/actions/global';

import setCSSProperty from '../../utils/setCSSProperty';

/**
 * Draws a red border around the viewer
 * @param context.action Viewer action
 * @returns state update
 */
// eslint-disable-next-line @typescript-eslint/require-await
const setDebugViewerSafeArea: ActionDispatcher<SetDebugViewerSafeArea> = async ({ action, state }) => {
  if (action.value && state.readGardenContainerNode) {
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
  setCSSProperty('debug-viewer-safe-area', `${action.value ? 1 : 0}`);
  return {
    debugViewerSafeArea: action.value,
  };
};

export default setDebugViewerSafeArea;
