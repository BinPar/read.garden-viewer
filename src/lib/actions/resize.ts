import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { Resize } from '../../model/actions/global';
import checkCurrentPage from '../../utils/checkCurrentPage';
import setCSSProperty from '../../utils/setCSSProperty';

import recalculate from '../../viewer/recalculate';

/**
 * Resize action
 * @param context.state Viewer state
 */
const resize: ActionDispatcher<Resize> = async ({ state }) => {
  setCSSProperty('viewer-margin-top', '200vh');
  const recalculateUpdate = await recalculate(state);
  if (recalculateUpdate.recalculating === false) {
    setCSSProperty('viewer-margin-top', '0');
  }
  checkCurrentPage();
  return recalculateUpdate;
};

export default resize;
