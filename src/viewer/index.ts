import log from 'loglevel';

import { APIInterface } from '../model/apiInterface';
import { ViewerFunction } from '../model/viewer';

import dispatch from '../lib/state/dispatch';
import { getState, initializeState } from '../lib/state';
import setInitialProperties from '../lib/styles/setInitialProperties';
import createBasicDOMElements from '../utils/createBasicDOMElements';
import { setupGlobalEvents, removeGlobalEvents } from '../utils/globalEvents';
import animationController from '../lib/animation/animationController';
import setupHandlers from '../utils/setupHandlers';

/**
 * Main viewer function
 * @param config Viewer config
 * @returns API Interface
 */
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
  animationController(state, api.dispatch);
  setupHandlers(state, api.dispatch);
  log.info('Viewer Initialized');
  return api;
};

export default viewer;
