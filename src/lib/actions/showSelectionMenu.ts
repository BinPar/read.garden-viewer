import log from 'loglevel';

import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { ShowSelectionMenu } from '../../model/actions/global';
import { OnDeleteOptionClick, OnSelectionMenuOptionClick } from '../../model/events';

import getSelectionRangeFromSelection from '../../utils/getSelectionRangeFromSelection';
import { removeExtensors } from '../../utils/highlights/drawExtensors';
import getMenuPositions from '../../utils/highlights/getMenuPositions';
import removeAllChildren from '../../utils/removeAllChildren';

let menu: HTMLDivElement;

const getMenu = (): HTMLDivElement => {
  if (!menu) {
    menu = document.createElement('div');
    menu.classList.add('rg-selection-menu');
  }
  removeAllChildren(menu);
  return menu;
};

const showSelectionMenu: ActionDispatcher<ShowSelectionMenu> = async ({ action, state }) => {
  const { key } = action;
  const { currentSelection } = state;
  let { selectionMenu } = state;

  if (key || currentSelection) {
    const { left, top, arrowDown } = getMenuPositions(state, 70, key, currentSelection);

    const currentMenu = getMenu();
    currentMenu.classList.add(`rg-${arrowDown ? 'bottom' : 'top'}-arrow`);
    currentMenu.style.top = `${top}px`;
    currentMenu.style.left = `${left}px`;

    const wrapper = document.createElement('div');
    wrapper.classList.add('rg-selection-menu-wrapper');
    currentMenu.appendChild(wrapper);

    const holder = document.createElement('div');
    holder.classList.add('rg-selection-menu-holder');
    wrapper.appendChild(holder);

    const onMouseDown = (e: MouseEvent | TouchEvent): void => {
      e.stopImmediatePropagation();
      e.stopPropagation();
    };

    currentMenu.onmousedown = onMouseDown;
    currentMenu.ontouchstart = onMouseDown;
    currentMenu.onclick = onMouseDown;

    action.options.forEach((option) => {
      const button = document.createElement('button');
      button.classList.add('rg-selection-option');
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
          const event: OnSelectionMenuOptionClick = {
            type: 'onSelectionMenuOptionClick',
            key: option.key,
            slug: state.slug,
            productSlug: state.productSlug,
          };
          if (action.key) {
            event.highlightKey = action.key;
            const userHighlightInfo = state.currentUserHighlights.get(action.key);
            if (userHighlightInfo) {
              const { start, end, obfuscatedText } = userHighlightInfo;
              event.selectionInfo = { start, end, obfuscatedText };
            }
          } else if (state.currentSelection) {
            event.selectionInfo = getSelectionRangeFromSelection(state.currentSelection);
          } else {
            log.warn('Clicked on selection menu option without key nor state.currentSelection');
          }
          state.config.eventHandler(event);
        }
        removeExtensors(state);
      };
      button.onclick = onClick;
      holder.appendChild(button);
    });

    if (action.key && action.deleteOption) {
      const separator = document.createElement('span');
      separator.classList.add('rg-separator');
      holder.appendChild(separator);

      const button = document.createElement('button');
      button.title = action.deleteOption.title;
      button.innerText = action.deleteOption.title;
      button.classList.add('rg-selection-option', 'rg-delete');
      if (action.deleteOption.className) {
        button.classList.add(action.deleteOption.className);
      }
      if (action.deleteOption.style) {
        button.setAttribute('style', action.deleteOption.style);
      }
      const onClick = (): void => {
        if (state.config.eventHandler && action.key) {
          const event: OnDeleteOptionClick = {
            type: 'onDeleteOptionClick',
            key: action.key,
            slug: state.slug,
            productSlug: state.productSlug,
          };
          state.config.eventHandler(event);
        }
      };
      button.onclick = onClick;
      holder.appendChild(button);
    }

    state.contentWrapperNode!.appendChild(currentMenu);
    selectionMenu = currentMenu;
  } else {
    log.warn(`No current selection nor user selection info at 'showSelectionMenu'`);
    selectionMenu = null;
  }

  return {
    selectionMenu,
  };
};

export default showSelectionMenu;
