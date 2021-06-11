import { ActionDispatcher, RemoveNotesDialog } from '../../model';
import remove from '../../utils/highlights/removeNotesDialog';

const removeNotesDialog: ActionDispatcher<RemoveNotesDialog> = async ({ state }) => {
  remove(state);
  return {};
};

export default removeNotesDialog;
