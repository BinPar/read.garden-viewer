import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

import setCSSProperty from '../../utils/setCSSProperty';

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
  setCSSProperty('column-gap-compensation', '0px');
  setCSSProperty('content-wrapper-height', '100vh');
  setCSSProperty('contrast-viewer-color', '1');
  setCSSProperty('column-width', '0px');
  setCSSProperty('current-selection-extensors-color', '#f2b818');
  setCSSProperty('current-selection-highlights-color', '#f2b818');
  setCSSProperty('debug-viewer-safe-area', `${state.debugViewerSafeArea ? 1 : 0}`);
  setCSSProperty('highlights-pointer-events', 'none');
  setCSSProperty('horizontal-translate', '0');
  setCSSProperty('invert-viewer-color', '0');
  setCSSProperty('line-height', '1.5em');
  setCSSProperty('padding-top', `${state.config.paddingTop}px`);
  setCSSProperty('padding-bottom', `${state.config.paddingBottom}px`);
  setCSSProperty('scale', `${state.scale}`);
  setCSSProperty('search-highlights-color', '#fdff04');
  setCSSProperty('sepia-viewer-color', '0');
  setCSSProperty('text-align', 'initial');
  setCSSProperty('total-column-width', '0px');
  setCSSProperty('total-height', '0px');
  setCSSProperty('total-width', '0px');
  setCSSProperty('user-select', 'none');
  setCSSProperty('user-select-end', 'none');
  setCSSProperty('vertical-translate', '0');
  setCSSProperty('viewer-margin-top', '200vh');
  setCSSProperty('pointer-events', 'auto');
  if (state.theme === 'dark') {
    setCSSProperty('theme-filter', 'invert(1)');
  }
  if (state.layout === LayoutTypes.Flow) {
    setCSSProperty('font-family', state.fontFamily);
    setCSSProperty('font-size', `${state.fontSize}px`);
    if (state.textAlign) {
      setCSSProperty('text-align', state.textAlign);
    }
  }
};

export default setInitialProperties;
