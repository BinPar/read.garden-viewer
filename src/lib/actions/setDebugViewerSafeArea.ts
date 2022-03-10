import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetDebugViewerSafeArea } from '../../model/actions/global';

import setCSSProperty from '../../utils/setCSSProperty';

/**
 * Draws a red border around the viewer
 * @param context.action Viewer action
 * @returns state update
 */
// eslint-disable-next-line @typescript-eslint/require-await
const setDebugViewerSafeArea: ActionDispatcher<SetDebugViewerSafeArea> = async ({ action }) => {
  setCSSProperty('debug-viewer-safe-area', `${action.value ? 1 : 0}`);
  return {
    debugViewerSafeArea: action.value,
  };
};

export default setDebugViewerSafeArea;
