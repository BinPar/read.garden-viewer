import {
  FixedState,
  GlobalState,
  PropChangeHandler,
  ScrolledState,
  State,
} from '../../model/state';
import { InitialConfig } from '../../model/config';
import { ViewerMode } from '../../model/viewerSettings';
import defaultGlobal from './defaultGlobal';
import defaultFlow from './defaultFlow';
import defaultScrolled from './defaultScrolled';
import defaultFixed from './defaultFixed';
import defaultPaginated from './defaultPaginated';
import defaultConfig from '../../config/default';
import { setConfig } from '../../config';
import changeHandlers from './changeHandlers';
import { notifyEventHandler } from './stateChangeEvents';
import { StatePropertyNames } from '../../model/actions/global';

const handlers = new Map<string, Map<any, PropChangeHandler>>();

for (let i = 0, l = changeHandlers.length; i < l; i++) {
  const { property, value, handler } = changeHandlers[i];
  let map = handlers.get(property);
  if (!map) {
    map = new Map<any, PropChangeHandler>();
    handlers.set(property, map);
  }
  if (!map.has(value)) {
    map.set(value, handler);
  } else {
    // eslint-disable-next-line no-console
    console.warn(`Duplicated handler for property ${property} and value ${value}`);
  }
}

let state: State;

export const initializeState = (initialConfig: InitialConfig): void => {
  const config = setConfig({
    ...defaultConfig,
    ...initialConfig,
    zoom: {
      ...defaultConfig.zoom,
      ...(initialConfig.zoom ?? {}),
    },
    fontSize: {
      ...defaultConfig.fontSize,
      ...(initialConfig.fontSize ?? {}),
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
      ...(initialMargins ?? {}),
    },
    title: 'Title', // From initial config
    slug: config.slug,
    contentSlug: config.contentSlug,
    dragging: false,
    scrollLeft: 0,
    scrollTop: 0,
    animate: false,
    animating: false,
    animationFriction: config.animationFriction,
    animationSpeed: config.animationSpeed,
    animationInertia: config.animationInertia,
    pageLabel: config.contentSlug, // Should be different (maybe we need to add `initialPageLabel`)
    pageNumber: 1, // From initial config
    scale: config.initialScale ?? defaultGlobal.scale,
    toggleReadModeOnClick: config.toggleReadModeOnClick ?? defaultGlobal.toggleReadModeOnClick,
    readMode: config.initialReadMode ?? false,
    searchTerms: new Array<string>(),
    searchRanges: new Array<Range>(),
    debugViewerSafeArea: config.debugViewerSafeArea,
    containerWidth: 0,
    containerHeight: 0,
  };

  const scrolledState: ScrolledState = {
    ...defaultScrolled,
    scrollMode: initialConfig.initialScrollMode || defaultScrolled.scrollMode,
  };

  if (config.layoutType === 'flow') {
    state = {
      ...globalState,
      ...defaultFlow,
      ...scrolledState,
      columnGap: config.columnGap,
      fontFamily: config.initialFontFamily,
    };
  }

  if (config.layoutType === 'fixed') {
    const fixedState: FixedState = {
      ...defaultFixed,
      fitMode: config.initialFitMode,
      loadingContent: true,
      loadedCssUrls: new Set<string>(),
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
        ...scrolledState,
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
      const oldValue = updatableState[key];
      updatableState[key] = newValue;
      const propertyHandlers = handlers.get(key);
      if (propertyHandlers) {
        const changeHandler = propertyHandlers.get(newValue);
        if (changeHandler) {
          changeHandler();
        }
      }
      notifyEventHandler<typeof newValue>(
        key as StatePropertyNames<typeof newValue>,
        newValue,
        oldValue,
      );
    }
  });
};
