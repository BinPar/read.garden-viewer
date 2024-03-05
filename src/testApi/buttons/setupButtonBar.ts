import { AddOnChangeEvent, RemoveAllChangeEvents } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/actions/common';
import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

import chapterNavigationButtons from './chapterNavigationButtons';
import debugViewerSafeArea from './debugViewerSafeArea';
import fontFamilyButtons from './fontFamilyButtons';
import fontSizeButtons from './fontSizeButtons';
import readModeToggle from './readModeToggle';
import scrollModeButtons from './scrollModeButtons';
import searchButtons from './searchButtons';
import textAlignButtons from './textAlignButtons';
import themeButtons from './themeButtons';
import navigationButtons from './navigationButtons';
import zoomControls from './zoomControls';
import lineHeightButtons from './lineHeightButtons';
import gapButtons from './gapButtons';
import doublePageButtons from './doublePageButtons';

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
    readModeToggle(testingButtonsPanel, state, dispatcher).catch((ex) => {
      const { stack, message } = ex as Error;
      console.error('Error at read mode toggle button setup', stack || message);
    });
    debugViewerSafeArea(testingButtonsPanel, state, dispatcher).catch((ex) => {
      const { stack, message } = ex as Error;
      console.error('Error at debug viewer safe area button setup', stack || message);
    });
    scrollModeButtons(testingButtonsPanel, state, dispatcher);
    searchButtons(testingButtonsPanel, state);
    themeButtons(testingButtonsPanel, state, dispatcher).catch((ex) => {
      const { stack, message } = ex as Error;
      console.error('Error at theme buttons setup', stack || message);
    });
    if (state.layout === LayoutTypes.Flow) {
      fontSizeButtons(testingButtonsPanel, state, dispatcher).catch((ex) => {
        const { stack, message } = ex as Error;
        console.error('Error at font size buttons setup', stack || message);
      });
      fontFamilyButtons(testingButtonsPanel, state, dispatcher);
      textAlignButtons(testingButtonsPanel, state, dispatcher);
      lineHeightButtons(testingButtonsPanel, state, dispatcher);
      chapterNavigationButtons(testingButtonsPanel, state, dispatcher);
    }
    if (state.layout === LayoutTypes.Fixed) {
      zoomControls(testingButtonsPanel, state, dispatcher).catch((ex) => {
        const { stack, message } = ex as Error;
        console.error('Error at zoom controls setup', stack || message);
      });
      gapButtons(testingButtonsPanel, state, dispatcher).catch((ex) => {
        const { stack, message } = ex as Error;
        console.error('Error at gap mode buttons setup', stack || message);
      });
    }
    if (state.scrollMode === 'fixed') {
      doublePageButtons(testingButtonsPanel, state, dispatcher).catch((ex) => {
        const { stack, message } = ex as Error;
        console.error('Error at double page buttons setup', stack || message);
      });
    }
    navigationButtons(testingButtonsPanel, state, dispatcher);
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
