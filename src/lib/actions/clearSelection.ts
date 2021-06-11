import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { ClearSelection } from '../../model/actions/global';
import clear from '../../utils/highlights/clearSelection';

const clearSelection: ActionDispatcher<ClearSelection> = async ({ state }) => {
  clear(state);
  return {};
};

export default clearSelection;