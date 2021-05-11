import { Actions } from '../../model/actions';
import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { Action } from '../../model/actions/common';
import { State } from '../../model/state';

import dispatchers from '../actions/actionDispatchers';

const reducer = async (state: State, action: Action): Promise<Partial<State>> => {
  const dispatcher = (dispatchers as { [key: string]: ActionDispatcher<Actions> })[action.type];
  if (dispatcher) {
    return dispatcher({
      state,
      action: action as Actions,
    });
  }
  throw Error(`There is no dispatcher for the action "${action.type}"`);
};

export default reducer;
