import { getState, updateState } from '../lib/state';
import { Resize } from '../model/actions/global';
import { DispatchAPIAction } from '../model/apiInterface';
import checkCurrentPage from './checkCurrentPage';

let onResize: () => void;
let onScroll: () => void;
let onViewportClick: () => void;

const setupGlobalEvents = (dispatcher: DispatchAPIAction): void => {
  const state = getState();

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
      updateState({ readMode: !state.readMode });
    }
  };

  const container = document.getElementById('rg-container');
  if (container) {
    container.addEventListener('click', onViewportClick);
  }
};

export const removeGlobalEvents = (): void => {
  if (onResize) {
    window.removeEventListener('resize', onResize);
  }
  if (onScroll) {
    window.removeEventListener('scroll', onScroll);
  }
  const container = document.getElementById('rg-container');
  if (container && onViewportClick) {
    container.removeEventListener('click', onViewportClick);
  }
};

export default setupGlobalEvents;
