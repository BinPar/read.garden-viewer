import setScrollMode from './setScrollMode';
import setDebugViewerSafeArea from './setDebugViewerSafeArea';
import appendNewContent from './appendNewContent';
import increaseFontSize from './increaseFontSize';
import decreaseFontSize from './decreaseFontSize';
import setFontSize from './setFontSize';
import setFontFamily from './setFontFamily';
import setTextAlign from './setTextAlign';
import resize from './resize';
import highlightSearchTerms from './highlightSearchTerms';
import setContentsInfo from './setContentsInfo';
import setReadMode from './setReadMode';

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
  resize,
  highlightSearchTerms,
  setContentsInfo,
  setReadMode,
};

export default actionDispatchers;
