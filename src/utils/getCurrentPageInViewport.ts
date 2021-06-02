import log from 'loglevel';

import { LayoutTypes } from '../model/viewerSettings';

import { getState } from '../lib/state';
import { getScrollLeftPosition, getScrollTopPosition } from './highlights';

/**
 * Gets current page in viewer and returns its label
 * @returns Current content label
 */
const getCurrentPageInViewport = (): string => {
  const state = getState();
  if (state.layout === LayoutTypes.Fixed) {
    const { contentsInfo, scrollMode } = state;
    if (!contentsInfo?.length) {
      return '';
    }
    if (scrollMode === 'horizontal') {
      const position = getScrollLeftPosition(state);
      return contentsInfo.find((c) => c.maxLeft > position)?.label || '';
    }
    if (scrollMode === 'vertical') {
      const position = getScrollTopPosition(state);
      return contentsInfo.find((c) => c.maxTop > position)?.label || '';
    }
    log.warn(
      `Method getCurrentPageInViewport called in fixed layout but scrollMode is not valid value: ${scrollMode}`,
    );
  }
  if (state.layout === LayoutTypes.Flow) {
    const { scrollMode, labelByPosition } = state;
    if (!labelByPosition || !labelByPosition.size) {
      log.warn('Missing labelByPosition map, unable to get current page in viewport');
      return '';
    }
    const position =
      scrollMode === 'horizontal' ? getScrollLeftPosition(state) : getScrollTopPosition(state);
    const [, label] = Array.from(labelByPosition.entries()).find(([pos]) => pos >= position) || [
      0,
      '',
    ];
    return label;
  }
  return '';
};

export default getCurrentPageInViewport;
