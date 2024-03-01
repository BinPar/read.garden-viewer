import { APIInterface, ViewerFunction } from '../model/viewer';

import dispatch from '../lib/state/dispatch';
import { getState, initializeState } from '../lib/state';
import setInitialProperties from '../lib/styles/setInitialProperties';
import createBasicDOMElements from '../utils/createBasicDOMElements';
import { setupGlobalEvents } from '../utils/globalEvents';
import animationController from '../lib/animation/animationController';
import setupHandlers from '../utils/setupHandlers';
import unmount from '../utils/unmount';
import ensureSafeAreas from '../utils/ensureSafeAreas';

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
    unmount: (): void => unmount(state),
  };
  setInitialProperties(state);
  createBasicDOMElements(state);
  if (state.debugViewerSafeArea) {
    ensureSafeAreas(state);
  }
  setupGlobalEvents(state, api.dispatch);
  animationController(state, api.dispatch);
  setupHandlers(state, api.dispatch).catch((ex) => {
    const { stack, message } = ex as Error;
    console.error('Error at handlers setup', stack || message);
  });
  console.debug('Viewer Initialized');
  return api;
};

export default viewer;
