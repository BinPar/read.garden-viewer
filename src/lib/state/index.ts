import {
  FixedState,
  GlobalState,
  LinkProps,
  PropChangeHandler,
  ScrolledState,
  State,
} from '../../model/state';
import { InitialConfig } from '../../model/config';
import { UserHighlightInfo, ViewerMode } from '../../model/viewerSettings';
import { StatePropertyNames } from '../../model/actions/global';

import defaultGlobal from './defaultGlobal';
import defaultFlow from './defaultFlow';
import defaultScrolled from './defaultScrolled';
import defaultFixed from './defaultFixed';
import defaultPaginated from './defaultPaginated';
import defaultConfig from '../../config/default';
import { setConfig } from '../../config';
import changeHandlers from './changeHandlers';
import { notifyEventHandler } from './stateChangeEvents';
import getMargins from '../../utils/getMargins';

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
    console.warn(
      `Duplicated handler for property ${property} and value ${value?.toString() || ''}`,
    );
  }
}

let state: State;

export const initializeState = (initialConfig: InitialConfig): void => {
  let config = setConfig({
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

  if (!initialConfig.initialFitMode && initialConfig.initialZoom) {
    config = setConfig({
      ...config,
      initialFitMode: undefined,
      initialZoom: initialConfig.initialZoom,
    });
  }

  if (config.layoutType === 'fixed' && config.initialFixedMode === ViewerMode.Paginated) {
    config.fixedViewerPreloadOrder = [0, 1, 2, 3, -1, -2, 5, 6, -3, -4, 7, 8, -5, -6];
  }

  const linksCustomProps = new Map<string, LinkProps>();

  if (config.linksProps) {
    Object.entries(config.linksProps).forEach(([key, value]) => {
      linksCustomProps.set(key, value);
    });
  }

  const margin = getMargins({ config, containerWidth: 0, readMode: config.initialReadMode });

  const globalState: GlobalState = {
    ...defaultGlobal,
    config,
    margin,
    title: 'Title', // From initial config
    slug: config.slug,
    productSlug: config.productSlug || config.slug,
    contentSlug: config.contentSlug,
    theme: config.initialTheme ?? defaultGlobal.theme,
    dragging: false,
    scrollLeft: 0,
    scrollTop: 0,
    animate: false,
    animating: false,
    updatingScroller: false,
    preventUpdateScroll: false,
    animationFriction: config.animationFriction,
    animationSpeed: config.animationSpeed,
    animationInertia: config.animationInertia,
    pageLabel: config.contentSlug, // Should be different (maybe we need to add `initialPageLabel`)
    pageNumber: 1, // From initial config
    toggleReadModeOnClick: config.toggleReadModeOnClick ?? defaultGlobal.toggleReadModeOnClick,
    readMode: config.initialReadMode ?? defaultGlobal.readMode,
    searchTerms: config.initialSearchTerms,
    searchRanges: new Array<Range>(),
    highlightersLayers: new Map<string, HTMLDivElement>(),
    currentUserHighlights: new Map<string, UserHighlightInfo>(),
    currentUserDomHighlights: new Map<string, HTMLDivElement[]>(),
    linksCustomProps,
    debugViewerSafeArea: config.debugViewerSafeArea,
    containerWidth: 0,
    containerHeight: 0,
    forceScroll: undefined,
    animateToScroll: undefined,
    interpolationValues: [],
    visibleContents: new Array<string>(),
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
      textAlign: config.initialTextAlign ?? defaultFlow.textAlign,
      lineHeight: config.initialLineHeight ?? defaultFlow.lineHeight,
    };

    if (config.initialFontSize) {
      state.fontSize = config.initialFontSize;
    }
  }

  if (config.layoutType === 'fixed') {
    const fixedState: FixedState = {
      ...defaultFixed,
      fitMode: config.initialFitMode,
      zoom: config.initialZoom,
      loadedCssUrls: new Set<string>(),
      minimumZoomValue: config.zoom.min ?? defaultFixed.minimumZoomValue,
      maximumZoomValue: config.zoom.max ?? defaultFixed.maximumZoomValue,
      gapMode: config.fixedPagesGap ?? defaultFixed.gapMode,
      gapSize: config.fixedPagesGapSize ?? defaultFixed.gapSize,
    };

    if (config.initialContent) {
      fixedState.loadingContent = config.initialContent.contentSlug;
    }

    if (config.initialFixedMode === ViewerMode.Paginated) {
      state = {
        ...globalState,
        ...fixedState,
        ...defaultPaginated,
        doublePage: initialConfig.initialDoublePage ?? defaultPaginated.doublePage,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updatableState = state;
  Object.keys(newState).forEach((key) => {
    const stateKey = key as keyof State;
    const newValue = newState[stateKey];
    if (newValue !== updatableState[stateKey]) {
      const oldValue = updatableState[stateKey];
      (updatableState as Record<keyof State, unknown>)[stateKey] = newValue;
      const propertyHandlers = handlers.get(key);
      if (propertyHandlers) {
        const changeHandler = propertyHandlers.get(newValue);
        if (changeHandler) {
          changeHandler();
        }
      }
      notifyEventHandler<typeof newValue>(
        stateKey as StatePropertyNames<typeof newValue>,
        newValue,
        oldValue,
      );
    }
  });
};
