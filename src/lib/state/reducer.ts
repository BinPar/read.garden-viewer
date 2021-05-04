import { Action, Actions, State } from '../../model/state';

const reducer = async (state: State, action: Action): Promise<Partial<State>> => {
  switch (action.type) {
    case Actions.ToggleReadMode:
      return {
        readMode: !state.readMode,
      };
    default:
      return state;
  }
};

export default reducer;
