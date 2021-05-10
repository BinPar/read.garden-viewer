import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';
import debugViewerSafeArea from './debugViewerSafeArea';
import flowChapterSelect from './flowChapterSelect';
import fontFamilyButtons from './fontFamilyButtons';
import fontSizeButtons from './fontSizeButtons';
import textAlignButtons from './textAlignButtons';

const setupButtonBar = (state: State, dispatcher: DispatchAPIAction): void => {
  const testingButtonsPanel = document.createElement('div');
  testingButtonsPanel.id = 'testing-buttons-panel';
  document.body.appendChild(testingButtonsPanel);
  debugViewerSafeArea(testingButtonsPanel, state, dispatcher);
  fontSizeButtons(testingButtonsPanel, state, dispatcher);
  fontFamilyButtons(testingButtonsPanel, state, dispatcher);
  textAlignButtons(testingButtonsPanel, state, dispatcher);
  flowChapterSelect(testingButtonsPanel, state);
};

export default setupButtonBar;
