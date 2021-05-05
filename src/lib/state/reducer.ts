import { Actions } from '../../model/actions';
import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { Action } from '../../model/actions/common';
import { State } from '../../model/state';

import actionDispatchers from '../actions/actionDispatchers';

const reducer = async (
  state: State,
  action: Action,
): Promise<Partial<State>> => {
  const dispatcher = (actionDispatchers as {[key: string]: ActionDispatcher<Actions>})[action.type];
  if (dispatcher) {
    return dispatcher(action as Actions, state);
  }
  throw Error(`There is no dispatcher for the action "${action.type}"`);
};

export default reducer;
