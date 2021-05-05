import log from 'loglevel';
import { getState, initializeState } from '../lib/state';
import { APIInterface } from '../model/apiInterface';
import dispatch from '../lib/state/dispatch';
import { ViewerFunction } from '../model/viewer';

const viewer: ViewerFunction = (config) => {
  initializeState(config);
  const api: APIInterface = {
    dispatch,
    state: getState(),
  };
  log.info('Viewer Initialized');
  return api;
};

export default viewer;
