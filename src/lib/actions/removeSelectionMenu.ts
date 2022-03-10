import { ActionDispatcher, RemoveSelectionMenu } from '../../model';
import remove from '../../utils/highlights/removeSelectionMenu';

// eslint-disable-next-line @typescript-eslint/require-await
const removeSelectionMenu: ActionDispatcher<RemoveSelectionMenu> = async () => {
  remove();
  return {
    selectionMenu: undefined,
  };
};

export default removeSelectionMenu;
