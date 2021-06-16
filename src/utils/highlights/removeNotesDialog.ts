import { getState, updateState } from '../../lib/state';

const removeNotesDialog = (state = getState()): void => {
  if (state.notesDialog) {
    state.notesDialog.remove();
  }
  if (state.confirmationDialog) {
    state.confirmationDialog.remove();
  }
  updateState({
    notesDialog: undefined,
    confirmationDialog: undefined,
  });
};

export default removeNotesDialog;
