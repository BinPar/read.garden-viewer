import log from 'loglevel';

import {
  ActionDispatcher,
  OnCancelNewNote,
  OnChangeNote,
  OnDeleteOptionClick,
  OnSaveNote,
  ShowNotesDialog,
} from '../../model';

import getSelectionRangeFromSelection from '../../utils/getSelectionRangeFromSelection';
import getConfirmationDialog from '../../utils/highlights/getConfirmationDialog';
import getMenuPositions from '../../utils/highlights/getMenuPositions';
import { updateState } from '../state';

// eslint-disable-next-line @typescript-eslint/require-await
const showNotesDialog: ActionDispatcher<ShowNotesDialog> = async ({ action, state }) => {
  const { key, highlightKey } = action;
  const { currentSelection } = state;
  let { notesDialog } = state;

  if (notesDialog) {
    notesDialog.remove();
  }

  if (highlightKey || currentSelection) {
    let confirmationDialog: HTMLDivElement | null = null;
    let editing = !!action.editing;

    const { left, top, arrowDown } = getMenuPositions(state, 180, highlightKey, currentSelection);

    const onMouseDown = (e: MouseEvent | TouchEvent): void => {
      e.stopImmediatePropagation();
      e.stopPropagation();
    };

    const menu = document.createElement('div');
    menu.onmousedown = onMouseDown;
    menu.ontouchstart = onMouseDown;
    menu.onclick = onMouseDown;
    menu.classList.add('rg-notes-dialog');
    menu.classList.add(`rg-${arrowDown ? 'bottom' : 'top'}-arrow`);
    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;

    const wrapper = document.createElement('div');
    wrapper.classList.add('rg-notes-dialog-wrapper');
    menu.appendChild(wrapper);

    const holder = document.createElement('div');
    holder.classList.add('rg-notes-dialog-holder');
    wrapper.appendChild(holder);

    const form = document.createElement('form');
    form.setAttribute('novalidate', '');
    holder.appendChild(form);

    const onSubmit = (e: Event): void => {
      e.preventDefault();
    };

    form.onsubmit = onSubmit;

    const fieldset = document.createElement('fieldset');
    form.appendChild(fieldset);

    const header = document.createElement('div');
    header.classList.add('rg-notes-dialog-header');
    fieldset.appendChild(header);

    const headerTitle = document.createElement('div');
    headerTitle.classList.add('rg-notes-dialog-header-title');
    header.appendChild(headerTitle);

    const headerButtons = document.createElement('div');
    headerButtons.classList.add('rg-notes-dialog-header-buttons');
    header.appendChild(headerButtons);

    const saveButton = document.createElement('button');
    saveButton.classList.add('rg-notes-save');
    saveButton.title = 'Guardar';

    const editButton = document.createElement('button');
    editButton.classList.add('rg-notes-edit');
    editButton.title = 'Editar';

    const separator = document.createElement('span');
    separator.classList.add('rg-separator');

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('rg-notes-cancel');
    cancelButton.title = 'Cancelar';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('rg-notes-delete');
    deleteButton.title = 'Eliminar';

    const textHolder = document.createElement('div');
    textHolder.classList.add('rg-notes-dialog-text-holder');
    fieldset.appendChild(textHolder);

    const textarea = document.createElement('textarea');
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('rg-notes-dialog-note');

    if (action.highlightKey) {
      noteDiv.innerText = action.note || '';
      textarea.value = action.note || '';
      (action.options || []).forEach((option) => {
        const button = document.createElement('button');
        button.classList.add('rg-notes-option');
        button.title = option.title;
        button.innerText = option.title;
        if (option.className) {
          button.classList.add(option.className);
        }
        if (option.selected) {
          button.classList.add('rg-selected');
        }
        if (option.style) {
          button.setAttribute('style', option.style);
        }
        const onClick = (): void => {
          if (state.config.eventHandler) {
            const event: OnChangeNote = {
              type: 'onChangeNote',
              key: option.key,
              slug: state.slug,
              productSlug: state.productSlug,
              highlightKey: action.highlightKey!,
              selectionInfo: action.selectionInfo,
              editing,
            };
            if (editing) {
              event.note = textarea.value;
            }
            state.config.eventHandler(event).catch((ex) => {
              const { stack, message } = ex as Error;
              console.error('Error at event handler', stack || message);
            });
          }
        };
        button.onclick = onClick;
        headerTitle.appendChild(button);
      });
    }

    if (action.title) {
      const title = document.createElement('p');
      title.innerText = action.title;
      headerTitle.appendChild(title);
    }

    if (action.color) {
      headerTitle.style.color = action.color;
    }

    if (action.highlightKey && !action.editing) {
      headerButtons.appendChild(editButton);
      headerButtons.appendChild(separator);
      headerButtons.appendChild(deleteButton);
      textHolder.appendChild(noteDiv);
    } else {
      headerButtons.appendChild(saveButton);
      headerButtons.appendChild(separator);
      headerButtons.appendChild(cancelButton);
      textHolder.appendChild(textarea);
    }

    const onSave = (e: Event): void => {
      e.preventDefault();
      if (textarea.value.trim() && state.config.eventHandler) {
        const event: OnSaveNote = {
          type: 'onSaveNote',
          slug: state.slug,
          productSlug: state.productSlug,
          note: textarea.value,
          key,
          highlightKey,
        };
        if (!highlightKey && state.currentSelection) {
          event.selectionInfo = getSelectionRangeFromSelection(state.currentSelection);
        }
        state.config.eventHandler(event).catch((ex) => {
          const { stack, message } = ex as Error;
          console.error('Error at event handler', stack || message);
        });
      } else if (!textarea.value.trim()) {
        textarea.focus();
      }
    };

    saveButton.onclick = onSave;

    const onCancel = (e: Event): void => {
      e.preventDefault();
      if (editing) {
        textarea.replaceWith(noteDiv);
        saveButton.replaceWith(editButton);
        cancelButton.replaceWith(deleteButton);
        editing = false;
      } else if (!highlightKey && state.config.eventHandler) {
        const event: OnCancelNewNote = {
          type: 'onCancelNewNote',
          slug: state.slug,
          productSlug: state.productSlug,
        };
        state.config.eventHandler(event).catch((ex) => {
          const { stack, message } = ex as Error;
          console.error('Error at event handler', stack || message);
        });
      }
    };

    cancelButton.onclick = onCancel;

    const onEdit = (e: Event): void => {
      e.preventDefault();
      noteDiv.replaceWith(textarea);
      editButton.replaceWith(saveButton);
      deleteButton.replaceWith(cancelButton);
      textarea.focus();
      editing = true;
    };

    editButton.onclick = onEdit;

    const onDelete = (ev: Event): void => {
      ev.preventDefault();
      const onConfirmDelete = (e: Event): void => {
        e.preventDefault();
        if (state.config.eventHandler) {
          const deleteEvent: OnDeleteOptionClick = {
            type: 'onDeleteOptionClick',
            slug: state.slug,
            productSlug: state.productSlug,
            key: action.highlightKey!,
          };
          state.config.eventHandler(deleteEvent).catch((ex) => {
            const { stack, message } = ex as Error;
            console.error('Error at event handler', stack || message);
          });
        }
      };
      const onCancelDelete = (e: Event): void => {
        e.preventDefault();
        state.contentWrapperNode!.removeChild(confirmationDialog!);
        state.contentWrapperNode!.appendChild(menu);
      };
      if (!confirmationDialog) {
        confirmationDialog = getConfirmationDialog(
          onConfirmDelete,
          onCancelDelete,
          state,
          highlightKey,
          currentSelection,
          action.confirmationMessage,
          action.confirmationOkText,
          action.confirmationCancelText,
        );
        updateState({
          confirmationDialog,
        });
      }
      state.contentWrapperNode!.removeChild(menu);
      state.contentWrapperNode!.appendChild(confirmationDialog);
    };

    deleteButton.onclick = onDelete;

    notesDialog = menu;
    state.contentWrapperNode!.appendChild(menu);
    textarea.focus();
  } else {
    log.warn(`No current selection nor user selection info at 'showNotesDialog'`);
    notesDialog = null;
  }

  return {
    notesDialog,
  };
};

export default showNotesDialog;
