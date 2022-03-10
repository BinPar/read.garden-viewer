import { ActionDispatcher, RemoveNotesDialog } from '../../model';
import remove from '../../utils/highlights/removeNotesDialog';

// eslint-disable-next-line @typescript-eslint/require-await
const removeNotesDialog: ActionDispatcher<RemoveNotesDialog> = async ({ state }) => {
  remove(state);
  return {};
};

export default removeNotesDialog;
