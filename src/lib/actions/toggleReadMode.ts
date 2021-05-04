import { State } from '../../model/state';

const toggleReadMode = async (
  state: State,
): Promise<Partial<State>> => ({
  readMode: !state.readMode,
});

export default toggleReadMode;
