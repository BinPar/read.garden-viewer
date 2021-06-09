import log from 'loglevel';
import { LayoutTypes } from '../../model';
import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { ShowSelectionMenu } from '../../model/actions/global';
import { OnDeleteOptionClick, OnSelectionMenuOptionClick } from '../../model/events';
import getSelectionRangeFromSelection from '../../utils/getSelectionRangeFromSelection';
import {
  clientToContentWrapperLeft,
  clientToContentWrapperTop,
} from '../../utils/highlights/clientToContentWrapperCoordinates';
import { updateState } from '../state';

const menuNeededSpace = 70;

const showSelectionMenu: ActionDispatcher<ShowSelectionMenu> = async ({ action, state }) => {
  const { currentSelection } = state;
  const { key } = action;
  if (key || currentSelection) {
    let arrowDown = true;
    let x = 0;
    let y = 0;

    let minLeft = 0;
    let maxLeft = Infinity;
    if (state.layout === LayoutTypes.Flow && state.lastClickCoords) {
      const clickLeft = clientToContentWrapperLeft(state.lastClickCoords!.x);
      minLeft = Math.floor(clickLeft / state.totalColumnWidth) * state.totalColumnWidth;
      maxLeft = minLeft + state.totalColumnWidth;
    }

    if (key) {
      const domHighlights = state.currentUserDomHighlights.get(key);
      if (domHighlights) {
        let left = Infinity;
        let top = Infinity;
        let width = 0;
        for (let i = 0, l = domHighlights.length; i < l; i++) {
          const rect = domHighlights[i].getBoundingClientRect();
          const rectLeft = clientToContentWrapperLeft(rect.left);
          if (rectLeft < maxLeft && rectLeft >= minLeft) {
            left = Math.min(left, rectLeft);
            top = Math.min(top, rect.top);
            width = Math.max(width, rect.width);
          }
        }
        x = left + width / 2;
        y = clientToContentWrapperTop(top);
      }
    } else if (currentSelection) {
      let left = Infinity;
      let top = Infinity;
      let bottom = 0;
      let width = 0;
      const rects = currentSelection.getClientRects();
      for (let i = 0, l = rects.length; i < l; i++) {
        const rect = rects[i];
        const rectLeft = clientToContentWrapperLeft(rect.left);
        if (rectLeft < maxLeft && rectLeft >= minLeft) {
          left = Math.min(left, rectLeft);
          top = Math.min(top, rect.top);
          width = Math.max(width, rect.width);
          bottom = Math.max(bottom, rect.bottom);
        }
      }
      x = left + width / 2;
      if (top < menuNeededSpace) {
        if ((state.containerHeight - bottom) >= menuNeededSpace) {
          arrowDown = false;
          top = bottom;
        } else {
          top = menuNeededSpace;
        }
      }
      y = clientToContentWrapperTop(top);
    }

    const menu = document.createElement('div');
    menu.classList.add('rg-selection-menu');
    menu.classList.add(`rg-${arrowDown ? 'bottom' : 'top'}-arrow`);
    menu.style.top = `${y}px`;
    menu.style.left = `${x}px`;

    const wrapper = document.createElement('div');
    wrapper.classList.add('rg-selection-menu-wrapper');
    menu.appendChild(wrapper);

    const holder = document.createElement('div');
    holder.classList.add('rg-selection-menu-holder');
    wrapper.appendChild(holder);

    const onMouseDown = (e: MouseEvent): void => {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
    };

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
      button.onmousedown = onMouseDown;
      const onClick = (): void => {
        if (state.config.eventHandler) {
          const event: OnSelectionMenuOptionClick = {
            type: 'onSelectionMenuOptionClick',
            key: option.key,
            slug: state.slug,
          };
          if (action.key) {
            event.highlightKey = action.key;
          } else if (state.currentSelection) {
            event.selectionInfo = getSelectionRangeFromSelection(state.currentSelection);
          } else {
            log.warn('Clicked on selection menu option without key nor state.currentSelection');
          }
          state.config.eventHandler(event);
        }
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
      button.onmousedown = onMouseDown;
      const onClick = (): void => {
        if (state.config.eventHandler && action.key) {
          const event: OnDeleteOptionClick = {
            type: 'onDeleteOptionClick',
            key: action.key,
            slug: state.slug,
          };
          state.config.eventHandler(event);
        }
      };
      button.onclick = onClick;
      holder.appendChild(button);
    }

    state.contentWrapperNode!.appendChild(menu);
    updateState({
      selectionMenu: menu,
    });
  } else {
    log.warn(`No current selection nor user selection info at 'showSelectionMenu'`);
  }

  return {};
};

export default showSelectionMenu;
