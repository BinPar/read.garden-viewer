import { Action } from '../../model/state';
import isObject from '../../tools/isObject';

import { getState } from './index';
import reducer from './reducer';

const updateState = (src: any, update: any): boolean => {
  let changed = false;
  Object.keys(update).forEach((key) => {
    if (isObject(src[key])) {
      changed = changed || updateState(src[key], update[key]);
    } else if (src[key] !== update[key]) {
      src[key] = update[key];
      changed = true;
    }
  });
  return changed;
};

const dispatch = async (action: Action): Promise<void> => {
  const state = getState();
  const update = await reducer(state, action);
  const changed = updateState(state, update);
  if (changed) {
    console.log('State changed after dispatched action: ', action);
  }
};

export default dispatch;
