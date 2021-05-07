import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetDebugViewerSafeArea } from '../../model/actions/global';

import setCSSProperty from '../../utils/setCSSProperty';

/**
 * Draws a red border around the viewer
 * @param action action value
 * @returns state update
 */
const setDebugViewerSafeArea: ActionDispatcher<SetDebugViewerSafeArea> = async (
  action,
) => {
  setCSSProperty('debug-viewer-safe-area', `${action.value ? 1 : 0}`);
  return {
    debugViewerSafeArea: action.value,
  };
};

export default setDebugViewerSafeArea;
