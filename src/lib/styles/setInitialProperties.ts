import { LayoutTypes, State } from '../../model/state';
import setCSSProperty from '../../utils/setCSSProperty';

const setInitialProperties = (state: State): void => {
  if (state.layout === LayoutTypes.Flow) {
    setCSSProperty('font-family', state.fontFamily);
  }
  setCSSProperty(
    'debug-viewer-safe-area',
    `${state.debugViewerSafeArea ? 1 : 0}`,
  );
  setCSSProperty('viewer-margin-top', '200vh');
  setCSSProperty('border-radius', '10px');
  setCSSProperty(
    'debug-viewer-safe-area',
    'calc(1px * var(--debug-viewer-safe-area))',
  );
  setCSSProperty(
    'safe-area-margin-correction',
    'calc(-1px * var(--debug-viewer-safe-area))',
  );
  setCSSProperty('animation-speed', '0');
  setCSSProperty('animation-speed-value', 'calc(1s * var(--animation-speed))');
  setCSSProperty('viewer-margin-top', '0');
  setCSSProperty('column-count', '2');
  setCSSProperty('column-gap', '0px');
  setCSSProperty('content-wrapper-height', '100vh');
  setCSSProperty('content-wrapper-padding', '0');
  setCSSProperty('total-width', '0');
  setCSSProperty('column-width', '0');
  setCSSProperty('current-selection-highlights-color', '#0030ff46');
  setCSSProperty('current-selection-extensors-color', '#0030ff46');
  setCSSProperty('search-highlights-color', '#ffcf0040');
  setCSSProperty('snap-type', 'x mandatory');
  setCSSProperty('font-size', '18px');
  setCSSProperty('line-height', '1.5em');
  setCSSProperty('text-align', 'initial');
  setCSSProperty('horizontal-translate', '0');
  setCSSProperty('vertical-translate', '0');
  setCSSProperty('scale', '1');
  setCSSProperty('contrast-viewer-color', '1');
  setCSSProperty('sepia-viewer-color', '0');
  setCSSProperty('invert-viewer-color', '0');
};

export default setInitialProperties;
