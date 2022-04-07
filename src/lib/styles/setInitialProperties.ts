import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

import setCSSProperty from '../../utils/setCSSProperty';
import removeCSSProperty from '../../utils/removeCSSProperty';

/**
 * Sets initial CSS properties values.
 * @param state Viewer state
 */
const setInitialProperties = (state: State): void => {
  /**
   * Properties are in alphabetical to assist looking for a specific one. Please, keep it like that
   */
  setCSSProperty('column-count', '2');
  setCSSProperty('column-gap', `${state.config.columnGap}px`);
  setCSSProperty('content-wrapper-height', '100vh');
  setCSSProperty('contrast-viewer-color', '1');
  setCSSProperty('column-width', '0px');
  setCSSProperty('current-selection-extensors-color', '#3273ff');
  setCSSProperty('current-selection-highlights-color', '#f2b818');
  setCSSProperty('extensors-pointer-events', 'auto');
  setCSSProperty('highlights-pointer-events', 'none');
  setCSSProperty('horizontal-translate', '0');
  setCSSProperty('invert-viewer-color', '0');
  setCSSProperty('next-chapter-navigation-opacity', '0');
  setCSSProperty('padding-top', `${state.config.paddingTop}px`);
  setCSSProperty('padding-bottom', `${state.config.paddingBottom}px`);
  setCSSProperty('pointer-events', 'auto');
  setCSSProperty('prev-chapter-navigation-opacity', '0');
  setCSSProperty('scale', `${state.scale}`);
  setCSSProperty('search-highlights-color', state.config.searchHighlightColor || '#fdff04');
  setCSSProperty('sepia-viewer-color', '0');
  setCSSProperty('text-align', 'initial');
  setCSSProperty('total-column-width', '0px');
  setCSSProperty('total-height', '0px');
  setCSSProperty('total-width', '0px');
  setCSSProperty('scroll-width', '0px');
  setCSSProperty('user-select', 'none');
  setCSSProperty('user-select-end', 'none');
  setCSSProperty('vertical-translate', '0');
  setCSSProperty('viewer-margin-top', '200vh');

  setCSSProperty('debug-viewer-safe-area', `${state.debugViewerSafeArea ? 1 : 0}`);
  setCSSProperty('safe-area-border-width', 'calc(1px * var(--debug-viewer-safe-area))');
  setCSSProperty('safe-area-read-top', `${state.config.readModeMargin.top}px`);
  setCSSProperty('safe-area-read-left', `${state.config.readModeMargin.left}px`);
  setCSSProperty('safe-area-read-right', `${state.config.readModeMargin.right}px`);
  setCSSProperty('safe-area-read-bottom', `${state.config.readModeMargin.bottom}px`);
  setCSSProperty('safe-area-ui-top', `${state.config.uiModeMargin.top}px`);
  setCSSProperty('safe-area-ui-left', `${state.config.uiModeMargin.left}px`);
  setCSSProperty('safe-area-ui-right', `${state.config.uiModeMargin.right}px`);
  setCSSProperty('safe-area-ui-bottom', `${state.config.uiModeMargin.bottom}px`);

  if (state.theme === 'dark') {
    setCSSProperty('theme-filter', 'invert(1)');
  } else {
    removeCSSProperty('theme-filter');
  }

  if (state.layout === LayoutTypes.Flow) {
    setCSSProperty('font-family', state.fontFamily);
    setCSSProperty('font-size', `${state.fontSize}px`);
    setCSSProperty('line-height', `${state.lineHeight}em`);
    if (state.textAlign) {
      setCSSProperty('text-align', state.textAlign);
    }
  }
};

export default setInitialProperties;
