import * as merge from 'deepmerge';

import { State, StateWithConfig } from '../../model/state';

import defaultState from './default';
import { getConfig } from '../../config';

let state: State = {
  ...defaultState,
};

export const getState = (): StateWithConfig => ({
  ...state,
  config: getConfig(),
});

export const updateState = (newState: Partial<State>): void => {
  state = merge(state, newState);
};
