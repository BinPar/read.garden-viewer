import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';
import debugViewerSafeArea from './debugViewerSafeArea';
import flowChapterSelect from './flowChapterSelect';
import fontFamilyButtons from './fontFamilyButtons';
import fontSizeButtons from './fontSizeButtons';
import readModeToggle from './readModeToggle';
import scrollModeButtons from './scrollModeButtons';
import searchButtons from './searchButtons';
import textAlignButtons from './textAlignButtons';

const setupButtonBar = (state: State, dispatcher: DispatchAPIAction): void => {
  const testingButtonsPanel = document.createElement('div');
  testingButtonsPanel.id = 'testing-buttons-panel';
  document.body.appendChild(testingButtonsPanel);
  readModeToggle(testingButtonsPanel, state, dispatcher);
  debugViewerSafeArea(testingButtonsPanel, state, dispatcher);
  fontSizeButtons(testingButtonsPanel, state, dispatcher);
  fontFamilyButtons(testingButtonsPanel, state, dispatcher);
  textAlignButtons(testingButtonsPanel, state, dispatcher);
  scrollModeButtons(testingButtonsPanel, state, dispatcher);
  searchButtons(testingButtonsPanel, state);
  flowChapterSelect(testingButtonsPanel, state);
};

export default setupButtonBar;
