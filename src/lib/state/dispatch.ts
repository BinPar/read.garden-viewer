import { DispatchAPIAction } from '../../model/apiInterface';

import { getState, updateState } from './index';
import reducer from './reducer';

const dispatch: DispatchAPIAction = async (action) => {
  const state = getState();
  const update = await reducer(state, action);
  updateState(update);
};

export default dispatch;
