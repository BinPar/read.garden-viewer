import { Action } from '../../model/state';

import { getState, updateState } from './index';
import reducer from './reducer';

const dispatch = async (action: Action): Promise<void> => {
  const state = getState();
  const update = await reducer(state, action);
  updateState(update);
};

export default dispatch;
