import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetTheme } from '../../model/actions/global';
import { State } from '../../model/state';

const setTheme: ActionDispatcher<SetTheme> = async ({ state, action }) => {
  const { theme } = action;
  if (state.theme !== theme) {
    const { readGardenContainerNode } = state as Required<State>;
    if (theme === 'dark') {
      readGardenContainerNode.style.filter = 'invert(1)';
    } else {
      readGardenContainerNode.style.filter = '';
    }
    return { theme };
  }
  return {};
};

export default setTheme;