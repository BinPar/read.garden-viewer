import { DispatchAPIAction } from '../../model/apiInterface';

import { getState, updateState } from './index';
import reducer from './reducer';

/**
 * Main viewer dispatcher
 * @param action Viewer action
 */
const dispatch: DispatchAPIAction = async (action) => {
  const state = getState();
  const update = await reducer(state, action);
  updateState(update);
};

export default dispatch;
