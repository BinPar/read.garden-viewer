import { LayoutTypes } from '../model';

import { getState } from '../lib/state';
import removeCSSProperty from './removeCSSProperty';

const cleanStyles = (state = getState()): void => {
  try {
    removeCSSProperty('column-count');
    removeCSSProperty('column-gap');
    removeCSSProperty('content-wrapper-height');
    removeCSSProperty('contrast-viewer-color');
    removeCSSProperty('column-width');
    removeCSSProperty('current-selection-extensors-color');
    removeCSSProperty('current-selection-highlights-color');
    removeCSSProperty('extensors-pointer-events');
    removeCSSProperty('highlights-pointer-events');
    removeCSSProperty('horizontal-translate');
    removeCSSProperty('invert-viewer-color');
    removeCSSProperty('next-chapter-navigation-opacity');
    removeCSSProperty('padding-top');
    removeCSSProperty('padding-bottom');
    removeCSSProperty('pointer-events');
    removeCSSProperty('prev-chapter-navigation-opacity');
    removeCSSProperty('scale');
    removeCSSProperty('search-highlights-color');
    removeCSSProperty('sepia-viewer-color');
    removeCSSProperty('text-align');
    removeCSSProperty('total-column-width');
    removeCSSProperty('total-height');
    removeCSSProperty('total-width');
    removeCSSProperty('scroll-width');
    removeCSSProperty('user-select');
    removeCSSProperty('user-select-end');
    removeCSSProperty('vertical-translate');
    removeCSSProperty('debug-viewer-safe-area');
    removeCSSProperty('safe-area-border-width');
    removeCSSProperty('safe-area-read-top');
    removeCSSProperty('safe-area-read-left');
    removeCSSProperty('safe-area-read-right');
    removeCSSProperty('safe-area-read-bottom');
    removeCSSProperty('safe-area-ui-top');
    removeCSSProperty('safe-area-ui-left');
    removeCSSProperty('safe-area-ui-right');
    removeCSSProperty('safe-area-ui-bottom');
    removeCSSProperty('theme-filter');
    removeCSSProperty('font-family');
    removeCSSProperty('font-size');
    removeCSSProperty('line-height');
    removeCSSProperty('text-align');
    const { dynamicStyleNode } = state;
    if (dynamicStyleNode) {
      dynamicStyleNode.remove();
    }
    if (state.layout === LayoutTypes.Fixed) {
      state.fixedStylesNodes.forEach((node) => {
        node.remove();
      });
    }
  } catch {
    // No need
  }
};

export default cleanStyles;
