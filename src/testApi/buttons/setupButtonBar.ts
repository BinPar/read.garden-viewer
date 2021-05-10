import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';
import debugViewerSafeArea from './debugViewerSafeArea';
import fontSizeButtons from './fontSizeButtons';

const setupButtonBar = (state: State, dispatcher: DispatchAPIAction): void => {
  const testingButtonsPanel = document.createElement('div');
  testingButtonsPanel.id = 'testing-buttons-panel';
  document.body.appendChild(testingButtonsPanel);
  debugViewerSafeArea(testingButtonsPanel, state, dispatcher);
  fontSizeButtons(testingButtonsPanel, state, dispatcher);
};

export default setupButtonBar;
