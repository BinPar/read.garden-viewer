import log from 'loglevel';
import { getState } from '../lib/state';
import { LayoutTypes } from '../model/state';

/**
 * Gets current page in viewer and returns its label
 * @returns Current content label
 */
const getCurrentPageInViewport = (): string => {
  const state = getState();
  let result = '';
  if (state.layout === LayoutTypes.Fixed) {
    const x = state.scrollMode === 'horizontal' ? 1 : (document.body.clientWidth / 2);
    const y = state.scrollMode === 'horizontal' ? (document.body.clientHeight / 2) : 1;
    const elements = document.elementsFromPoint(x, y);
    for (let i = 0, l = elements.length; i < l && !result; i++) {
      const element = elements[i] as HTMLElement;
      if (element.dataset.label) {
        result = element.dataset.label;
      }
    }
  }
  if (state.layout === LayoutTypes.Flow) {
    log.warn('Method getCurrentPageInViewport is not implemented for flow layout');
  }
  return result;
};

export default getCurrentPageInViewport