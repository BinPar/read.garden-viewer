import log from 'loglevel';
import { getState, updateState } from '../lib/state';
import { Resize } from '../model/actions/global';
import { DispatchAPIAction } from '../model/apiInterface';
import getCurrentPageInViewport from './getCurrentPageInViewport';

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
    const slug = getCurrentPageInViewport();
    if (slug && state.contentSlug !== slug) {
      log.info('Page changed by scroll', slug);
    }
  };

  window.addEventListener('scroll', onScroll);

  onViewportClick = (): void => {
    if (state.toggleReadModeOnClick) {
      updateState({ readMode: !state.readMode });
    }
  };

  const viewer = document.getElementById('rg-viewer');
  if (viewer) {
    viewer.addEventListener('click', onViewportClick);
  }
};

export const removeGlobalEvents = (): void => {
  if (onResize) {
    window.removeEventListener('resize', onResize);
  }
  if (onScroll) {
    window.removeEventListener('scroll', onScroll);
  }
  const viewer = document.getElementById('rg-viewer');
  if (viewer && onViewportClick) {
    viewer.removeEventListener('click', onViewportClick);
  }
};

export default setupGlobalEvents;
