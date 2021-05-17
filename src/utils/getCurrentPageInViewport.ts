import log from 'loglevel';
import { getState } from '../lib/state';
import { LayoutTypes } from '../model/state';

/**
 * Gets current page in viewer and returns its slug
 * @returns Current content slug
 */
const getCurrentPageInViewport = (): string => {
  const state = getState();
  let result = '';
  if (state.layout === LayoutTypes.Fixed) {
    const x = state.scrollMode === 'horizontal' ? 1 : (window.innerWidth / 2);
    const y = state.scrollMode === 'horizontal' ? (window.innerHeight / 2) : 1;
    const elements = document.elementsFromPoint(x, y);
    for (let i = 0, l = elements.length; i < l && !result; i++) {
      const element = elements[i] as HTMLElement;
      if (element.dataset.slug) {
        result = element.dataset.slug;
      }
    }
  }
  if (state.layout === LayoutTypes.Flow) {
    log.warn('Method getCurrentPageInViewport is not implemented for flow layout');
  }
  return result;
};

export default getCurrentPageInViewport