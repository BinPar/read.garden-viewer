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
import addOnChangeEvent from './addOnChangeEvent'
import removeOnChangeEvent from './removeOnChangeEvent';
import removeAllOnChangeEvents from './removeAllOnChangeEvents';
import setTheme from './setTheme';
import navigateToPreviousChapter from './navigateToPreviousChapter';
import navigateToNextChapter from './navigateToNextChapter';
import navigateToPage from './navigateToPage';
import setFitMode from './setFitMode';
import setZoom from './setZoom';

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
  addOnChangeEvent,
  removeOnChangeEvent,
  removeAllOnChangeEvents,
  setTheme,
  navigateToPreviousChapter,
  navigateToNextChapter,
  navigateToPage,
  setFitMode,
  setZoom,
};

export default actionDispatchers;
