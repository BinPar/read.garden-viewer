import { AddOnChangeEvent, RemoveAllChangeEvents } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/apiInterface';
import { LayoutTypes, State } from '../../model/state';
import debugViewerSafeArea from './debugViewerSafeArea';
import flowChapterSelect from './flowChapterSelect';
import fontFamilyButtons from './fontFamilyButtons';
import fontSizeButtons from './fontSizeButtons';
import readModeToggle from './readModeToggle';
import scrollModeButtons from './scrollModeButtons';
import searchButtons from './searchButtons';
import textAlignButtons from './textAlignButtons';

const setupButtonBar = async (state: State, dispatcher: DispatchAPIAction): Promise<void> => {
  const redrawToolbar = async (): Promise<void> => {
    const previousTestingPanel = document.getElementById('testing-buttons-panel');
    if (previousTestingPanel) {
      const removeAllPreviousEvents: RemoveAllChangeEvents = {
        type: 'removeAllChangeEvents',
      };    
      await dispatcher(removeAllPreviousEvents);
      previousTestingPanel.remove();
    }
    const testingButtonsPanel = document.createElement('div');
    testingButtonsPanel.id = 'testing-buttons-panel';
    document.body.appendChild(testingButtonsPanel);
    readModeToggle(testingButtonsPanel, state, dispatcher);
    debugViewerSafeArea(testingButtonsPanel, state, dispatcher);
    scrollModeButtons(testingButtonsPanel, state, dispatcher);
    searchButtons(testingButtonsPanel, state);
    if (state.layout === LayoutTypes.Flow) {
      fontSizeButtons(testingButtonsPanel, state, dispatcher);
      fontFamilyButtons(testingButtonsPanel, state, dispatcher);
      textAlignButtons(testingButtonsPanel, state, dispatcher);
      flowChapterSelect(testingButtonsPanel, state);
    }    
  };

  const onLayoutChanged: AddOnChangeEvent<LayoutTypes> = {
    type: 'addOnChangeEvent',
    propertyName: 'layout',
    event: redrawToolbar,
  };

  await dispatcher(onLayoutChanged);
  await redrawToolbar();
};

export default setupButtonBar;
