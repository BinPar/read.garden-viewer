import { LayoutTypes, State } from '../../model/state';
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
  setCSSProperty('content-wrapper-padding', '0');
  setCSSProperty('contrast-viewer-color', '1');
  setCSSProperty('column-width', '0px');
  setCSSProperty('current-selection-extensors-color', '#0030ff46');
  setCSSProperty('current-selection-highlights-color', '#0030ff46');
  setCSSProperty('debug-viewer-safe-area', `${state.debugViewerSafeArea ? 1 : 0}`);
  setCSSProperty('horizontal-translate', '0');
  setCSSProperty('invert-viewer-color', '0');
  setCSSProperty('line-height', '1.5em');
  setCSSProperty('padding-bottom', '0px');
  setCSSProperty('padding-top', '0px');
  setCSSProperty('scale', `${state.scale}`);
  setCSSProperty('search-highlights-color', '#ffcf0040');
  setCSSProperty('sepia-viewer-color', '0');
  setCSSProperty('text-align', 'initial');
  setCSSProperty('total-column-width', '0px');
  setCSSProperty('total-height', '0px');
  setCSSProperty('total-width', '0px');
  setCSSProperty('user-select', 'auto');
  setCSSProperty('user-select-end', 'none');
  setCSSProperty('vertical-translate', '0');
  setCSSProperty('viewer-margin-top', '200vh');

  if (state.layout === LayoutTypes.Flow) {
    setCSSProperty('font-family', state.fontFamily);
    setCSSProperty('font-size', `${state.fontSize}px`);
  }
};

export default setInitialProperties;
