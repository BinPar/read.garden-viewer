import { Actions } from '../../model/actions';

import { getState, updateState } from './index';
import reducer from './reducer';

const dispatch = async (action: Actions): Promise<void> => {
  const state = getState();
  const update = await reducer(state, action);
  updateState(update);
};

export default dispatch;
