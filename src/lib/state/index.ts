import { FixedState, GlobalState, State } from '../../model/state';
import { InitialConfig } from '../../model/config';
import { ViewerMode } from '../../model/viewerSettings';

import defaultGlobal from './defaultGlobal';
import defaultFlow from './defaultFlow';
import defaultScrolled from './defaultScrolled';
import defaultFixed from './defaultFixed';
import defaultPaginated from './defaultPaginated';
import defaultConfig from '../../config/default';
import { setConfig } from '../../config';
import { cssLoaded } from '../events/onCssLoaded';

let state: State;

export const initializeState = (initialConfig: InitialConfig): void => {
  const config = setConfig({
    ...defaultConfig,
    ...initialConfig,
    zoom: {
      ...defaultConfig.zoom,
      ...(initialConfig.zoom || {}),
    },
    fontSize: {
      ...defaultConfig.fontSize,
      ...(initialConfig.fontSize || {}),
    },
  });

  const defaultInitialMargins = config.initialReadMode
    ? defaultConfig.readModeMargin
    : defaultConfig.uiModeMargin;
  const initialMargins = config.initialReadMode ? config.readModeMargin : config.uiModeMargin;

  const globalState: GlobalState = {
    ...defaultGlobal,
    config,
    margin: {
      ...defaultInitialMargins,
      ...(initialMargins || {}),
    },
    title: 'Title', // From initial config
    pageLabel: config.contentSlug,
    pageNumber: 1, // From initial config
    scale: config.initialScale || defaultGlobal.scale,
    searchTerms: [],
    debugViewerSafeArea: config.debugViewerSafeArea,
    containerWidth: 0,
    containerHeight: 0,
  };

  if (config.layoutType === 'flow') {
    state = {
      ...globalState,
      ...defaultFlow,
      ...defaultScrolled,
      columnGap: config.columnGap,
      readMode: config.initialReadMode,
      fontFamily: config.initialFontFamily,
    };
  }

  if (config.layoutType === 'fixed') {
    const fixedState: FixedState = {
      ...defaultFixed,
      fitMode: config.initialFitMode,
    };

    if (config.initialFixedMode === ViewerMode.Paginated) {
      state = {
        ...globalState,
        ...fixedState,
        ...defaultPaginated,
      };
    }
    if (config.initialFixedMode === ViewerMode.WithScroll) {
      state = {
        ...globalState,
        ...fixedState,
        ...defaultScrolled,
      };
    }
  }
};

export const getState = (): State => state;

export const updateState = (newState: Partial<State>): void => {
  const updatableState = state as any;
  Object.keys(newState).forEach((key) => {
    const newValue = (newState as any)[key];
    if (newValue !== updatableState[key]) {
      updatableState[key] = newValue;
      if (key === 'cssLoaded' && newValue === true) {
        cssLoaded();
      }
    }
  });
};
