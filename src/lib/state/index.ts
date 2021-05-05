import { FixedState, GlobalState, State } from '../../model/state';
import { setConfig } from '../../config';
import { InitialConfig } from '../../model/config';
import { ViewerMode } from '../../model/viewer';
import defaultConfig from '../../config/default';
import defaultGlobal from './defaultGlobal';
import defaultFlow from './defaultFlow';
import defaultScrolled from './defaultScrolled';
import defaultFixed from './defaultFixed';
import defaultPaginated from './defaultPaginated';

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
  const initialMargins = config.initialReadMode
    ? config.readModeMargin
    : config.uiModeMargin;

  const globalState: GlobalState = {
    ...defaultGlobal,
    config,
    margin: {
      ...defaultInitialMargins,
      ...(initialMargins || {}),
    },
    title: 'Title', // From initial config
    pageLabel: '1', // From initial config
    pageNumber: 1, // From initial config
    scale: config.initialScale || defaultGlobal.scale,
    searchTerms: [],
  };

  if (config.layoutType === 'flow') {
    state = {
      ...globalState,
      ...defaultFlow,
      ...defaultScrolled,
      columnGap: config.columnGap,
      readMode: config.initialReadMode,
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
  Object.keys(newState).forEach(key => {
    updatableState[key] = (newState as any)[key];
  });
};
