import log from 'loglevel';
import { getState, initializeState } from '../lib/state';
import { APIInterface } from '../model/apiInterface';
import dispatch from '../lib/state/dispatch';
import { ViewerFunction } from '../model/viewer';
import createBasicDOMElements from '../utils/createBasicDOMElements';
import { LoadNewContent } from '../model/events';
import setInitialProperties from '../lib/styles/setInitialProperties';
import setupGlobalEvents, { removeGlobalEvents } from '../utils/setupGlobalEvents';

const viewer: ViewerFunction = (config) => {
  initializeState(config);
  const state = getState();
  const api: APIInterface = {
    dispatch,
    state,
    unmount: removeGlobalEvents,
  };
  setInitialProperties(state);
  createBasicDOMElements(state);
  setupGlobalEvents(api.dispatch);
  const loadNewContent: LoadNewContent = {
    type: 'loadNewContent',
    slug: config.slug,
    contentSlug: config.contentSlug,
  };
  if (state.config.eventHandler) {
    state.config.eventHandler(loadNewContent);
  }
  log.info('Viewer Initialized');
  return api;
};

export default viewer;
