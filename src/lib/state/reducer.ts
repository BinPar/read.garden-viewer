import { Actions } from '../../model/actions';
import { State } from '../../model/state';

const reducer = async (state: State, action: Actions): Promise<Partial<State>> => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
