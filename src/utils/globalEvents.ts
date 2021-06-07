import { Resize } from '../model/actions/global';
import { DispatchAPIAction } from '../model/apiInterface';

import { updateState } from '../lib/state';
import checkCurrentPage from './checkCurrentPage';
import { State } from '../model/state';

let onResize: () => void;
let onScroll: () => void;
let onViewportClick: () => void;

/**
 * Sets up viewer global events
 * @param dispatcher Viewer dispatcher
 */
export const setupGlobalEvents = (state: State, dispatcher: DispatchAPIAction): void => {
  onResize = (): void => {
    const action: Resize = {
      type: 'resize',
    };
    dispatcher(action);
  };

  window.addEventListener('resize', onResize);

  onScroll = (): void => {
    checkCurrentPage();
  };

  window.addEventListener('scroll', onScroll);

  onViewportClick = (): void => {
    if (state.toggleReadModeOnClick) {
      if (!state.dragging) {
        updateState({ readMode: !state.readMode });
      }
    }
  };

  if (state.readGardenContainerNode) {
    state.readGardenContainerNode.addEventListener('click', onViewportClick);
  }
};

/**
 * Removes global events
 */
export const removeGlobalEvents = (state: State): void => {
  const { readGardenContainerNode } = state;
  if (onResize) {
    window.removeEventListener('resize', onResize);
  }
  if (onScroll) {
    window.removeEventListener('scroll', onScroll);
  }
  if (readGardenContainerNode && onViewportClick) {
    readGardenContainerNode.removeEventListener('click', onViewportClick);
  }
};
