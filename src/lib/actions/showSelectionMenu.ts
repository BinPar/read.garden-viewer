import log from 'loglevel';
import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { ShowSelectionMenu } from '../../model/actions/global';
import { OnSelectionMenuOptionClick } from '../../model/events';
import getSelectionRangeFromSelection from '../../utils/getSelectionRangeFromSelection';
import { clientToContentWrapperCoordinates } from '../../utils/highlights';
import { updateState } from '../state';

const showSelectionMenu: ActionDispatcher<ShowSelectionMenu> = async ({ action, state }) => {
  const { currentSelection } = state;
  if (currentSelection) {
    const rect = currentSelection.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    const coords = clientToContentWrapperCoordinates({ x, y });

    const menu = document.createElement('div');
    menu.classList.add('rg-selection-menu');
    menu.style.top = `${coords.y}px`;
    menu.style.left = `${coords.x}px`;

    const wrapper = document.createElement('div');
    wrapper.classList.add('rg-selection-menu-wrapper');
    wrapper.classList.add('rg-bottom-arrow');
    menu.appendChild(wrapper);

    const holder = document.createElement('div');
    holder.classList.add('rg-selection-menu-holder');
    wrapper.appendChild(holder);

    action.options.forEach((option) => {
      const button = document.createElement('button');
      button.classList.add('rg-selection-option');
      button.title = option.title;
      button.innerText = 'H';
      if (option.className) {
        button.classList.add(option.className);
      }
      if (option.style) {
        button.setAttribute('style', option.style);
      }
      const onMouseDown = (e: MouseEvent): void => {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
      };
      button.onmousedown = onMouseDown;
      const onClick = (): void => {
        if (state.currentSelection && state.config.eventHandler) {
          const event: OnSelectionMenuOptionClick = {
            type: 'onSelectionMenuOptionClick',
            key: option.key,
            slug: state.slug,
            selectionInfo: getSelectionRangeFromSelection(state.currentSelection),
          };
          state.config.eventHandler(event);
        }
      };
      button.onclick = onClick;
      holder.appendChild(button);
    });

    state.contentWrapperNode!.appendChild(menu);
    updateState({
      selectionMenu: menu,
    });
  } else {
    log.warn(`No current selection at 'showSelectionMenu'`);
  }

  return {};
};

export default showSelectionMenu;
