import setScrollMode from './setScrollMode';
import setDebugViewerSafeArea from './setDebugViewerSafeArea';
import appendNewContent from './appendNewContent';
import increaseFontSize from './increaseFontSize';
import decreaseFontSize from './decreaseFontSize';
import setFontSize from './setFontSize';
import setFontFamily from './setFontFamily';
import setTextAlign from './setTextAlign';

/**
 * List of all action dispatchers
 */
const actionDispatchers  = {
  setScrollMode,
  setDebugViewerSafeArea,
  appendNewContent,
  increaseFontSize,
  decreaseFontSize,
  setFontSize,
  setFontFamily,
  setTextAlign,
};

export default actionDispatchers;
