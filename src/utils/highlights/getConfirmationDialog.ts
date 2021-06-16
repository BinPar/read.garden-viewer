import { State } from '../../model/state';
import getMenuPositions from './getMenuPositions';

const getConfirmationDialog = (
  onDelete: (e: Event) => void,
  onCancel: (e: Event) => void,
  state: State,
  highlightKey: string | undefined,
  currentSelection: Range | null | undefined,
  confirmationMessage?: string,
  confirmationOkText?: string,
  confirmationCancelText?: string,
): HTMLDivElement => {
  const { left, top, arrowDown } = getMenuPositions(state, 180, highlightKey, currentSelection);
  const menu = document.createElement('div');
  menu.classList.add('rg-confirmation-dialog');
  menu.classList.add(`rg-${arrowDown ? 'bottom' : 'top'}-arrow`);
  menu.style.top = `${top}px`;
  menu.style.left = `${left}px`;

  const onMouseDown = (e: MouseEvent): void => {
    e.stopImmediatePropagation();
    e.stopPropagation();
  };

  menu.onmousedown = onMouseDown;

  const wrapper = document.createElement('div');
  wrapper.classList.add('rg-confirmation-dialog-wrapper');
  menu.appendChild(wrapper);

  const holder = document.createElement('div');
  holder.classList.add('rg-confirmation-dialog-holder');
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

  const container = document.createElement('div');
  container.classList.add('rg-confirmation-dialog-holder');
  fieldset.appendChild(container);

  const message = document.createElement('p');
  message.innerText = confirmationMessage || '¿Realmente deseas eliminar esta nota?';
  container.appendChild(message);

  const buttons = document.createElement('div');
  buttons.classList.add('rg-confirmation-dialog-buttons');
  container.appendChild(buttons);

  const deleteButton = document.createElement('button');
  deleteButton.innerText = confirmationOkText || 'Eliminar';
  deleteButton.onclick = onDelete;
  buttons.appendChild(deleteButton);

  const cancelButton = document.createElement('button');
  cancelButton.innerText = confirmationCancelText || 'Cancelar';
  cancelButton.onclick = onCancel;
  buttons.appendChild(cancelButton);

  return menu;
};

export default getConfirmationDialog;
