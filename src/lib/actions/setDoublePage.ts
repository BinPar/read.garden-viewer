import { ActionDispatcher, SetDoublePage } from '../../model';

// eslint-disable-next-line @typescript-eslint/require-await
const setDoublePage: ActionDispatcher<SetDoublePage> = async ({ action, state }) => {
  if (state.scrollMode === 'fixed') {
    return { doublePage: action.doublePage };
  }
  return {};
};

export default setDoublePage;
