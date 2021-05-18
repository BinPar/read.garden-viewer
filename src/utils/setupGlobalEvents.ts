import log from 'loglevel';
import { getState, updateState } from '../lib/state';
import { Resize } from '../model/actions/global';
import { DispatchAPIAction } from '../model/apiInterface';
import { LayoutTypes } from '../model/state';
import getCurrentPageInViewport from './getCurrentPageInViewport';
import loadContentsInBackground from './loadContentsInBackground';

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
    const label = getCurrentPageInViewport();
    if (label) {
      if (state.layout === LayoutTypes.Fixed) {
        const content = state.contentsByLabel.get(label);
        if (content && content.slug && state.contentSlug !== content.slug) {
          log.info('Page changed by scroll', content.slug);
          updateState({ currentContentIndex: content.order });
          loadContentsInBackground();
        }
      }
      // TODO: Flow behavior
    }
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
