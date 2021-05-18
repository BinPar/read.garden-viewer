import log from 'loglevel';
import { getState } from '../lib/state';
import { LayoutTypes } from '../model/state';
import { getScrollLeftPosition, getScrollTopPosition } from './highlights/getScrollPosition';

/**
 * Gets current page in viewer and returns its label
 * @returns Current content label
 */
const getCurrentPageInViewport = (): string => {
  const state = getState();
  if (state.layout === LayoutTypes.Fixed) {
    const { contentsInfo, scrollMode } = state;
    if (scrollMode === 'horizontal') {
      const position = getScrollLeftPosition();
      return (contentsInfo.find(c => c.maxLeft > position)?.label) || '';
    }
    if (scrollMode === 'vertical') {
      const position = getScrollTopPosition();
      return (contentsInfo.find(c => c.maxTop > position)?.label) || '';
    }
    log.warn(`Method getCurrentPageInViewport called in fixed layout but scrollMode is not valid value: ${scrollMode}`);
  }
  if (state.layout === LayoutTypes.Flow) {
    log.warn('Method getCurrentPageInViewport is not implemented for flow layout');
  }
  return '';
};

export default getCurrentPageInViewport