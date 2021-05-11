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
  setCSSProperty('animation-speed', '0');
  setCSSProperty('animation-speed-value', 'calc(1s * var(--animation-speed))');
  setCSSProperty('border-radius', '10px');
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
  setCSSProperty('safe-area-border-width', 'calc(1px * var(--debug-viewer-safe-area))');
  setCSSProperty('safe-area-margin-correction', 'calc(-1px * var(--debug-viewer-safe-area))');
  setCSSProperty('scale', '1');
  setCSSProperty('search-highlights-color', '#ffcf0040');
  setCSSProperty('sepia-viewer-color', '0');
  setCSSProperty('text-align', 'initial');
  setCSSProperty('total-column-width', '0px');
  setCSSProperty('total-width', '0px');
  setCSSProperty('vertical-translate', '0');
  setCSSProperty('viewer-margin-top', '200vh');

  if (state.layout === LayoutTypes.Flow) {
    setCSSProperty('font-family', state.fontFamily);
    setCSSProperty('font-size', `${state.fontSize}px`);
  }
};

export default setInitialProperties;
