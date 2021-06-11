import { ActionDispatcher, RemoveSelectionMenu } from '../../model';
import remove from '../../utils/highlights/removeSelectionMenu';

const removeSelectionMenu: ActionDispatcher<RemoveSelectionMenu> = async () => {
  remove();
  return {
    selectionMenu: undefined,
  };
};

export default removeSelectionMenu;
