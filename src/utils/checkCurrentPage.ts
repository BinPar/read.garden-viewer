import log from 'loglevel';
import { getState, updateState } from '../lib/state';
import { LayoutTypes } from '../model/state';
import getCurrentPageInViewport from './getCurrentPageInViewport';
import loadContentsInBackground from './loadContentsInBackground';

/**
 * Checks current page and invokes needed events or methods if page has changed
 */
const checkCurrentPage = (): void => {
  const state = getState();
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

export default checkCurrentPage;
