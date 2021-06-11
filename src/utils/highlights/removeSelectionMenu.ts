import { getState, updateState } from '../../lib/state';

const removeSelectionMenu = (state = getState()): void => {
  if (state.selectionMenu) {
    state.selectionMenu.remove();
  }
  updateState({
    selectionMenu: undefined,
  });
};

export default removeSelectionMenu;
