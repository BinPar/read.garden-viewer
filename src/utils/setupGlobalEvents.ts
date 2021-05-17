import log from 'loglevel';
import { getState } from '../lib/state';
import { Resize } from '../model/actions/global';
import { DispatchAPIAction } from '../model/apiInterface';
import getCurrentPageInViewport from './getCurrentPageInViewport';

const setupGlobalEvents = (dispatcher: DispatchAPIAction): void => {
  const state = getState();

  window.addEventListener('resize', (): void => {
    const action: Resize = {
      type: 'resize',
    };
    dispatcher(action);
  });

  window.addEventListener('scroll', (): void => {
    const slug = getCurrentPageInViewport();
    if (slug && state.contentSlug !== slug) {
      log.info('Page changed by scroll', slug);
    }
  });
};

export default setupGlobalEvents;
