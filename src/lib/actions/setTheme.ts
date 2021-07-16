import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetTheme } from '../../model/actions/global';

import removeCSSProperty from '../../utils/removeCSSProperty';
import setCSSProperty from '../../utils/setCSSProperty';

const setTheme: ActionDispatcher<SetTheme> = async ({ state, action }) => {
  const { theme } = action;
  if (state.theme !== theme) {
    if (theme === 'dark') {
      setCSSProperty('theme-filter', 'invert(1)');
    } else {
      removeCSSProperty('theme-filter');
    }
    document.body.classList.remove(`rg-${state.theme}-theme`);
    document.body.classList.add(`rg-${theme}-theme`);
    return { theme };
  }
  return {};
};

export default setTheme;