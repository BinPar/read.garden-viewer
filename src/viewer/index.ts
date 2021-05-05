import log from 'loglevel';
import { getState, initializeState } from '../lib/state';
import { APIInterface } from '../model/apiInterface';
import { InitialConfig } from '../model/config';
import dispatch from '../lib/state/dispatch';

const viewer = (config: InitialConfig): APIInterface => {
  initializeState(config);
  const api: APIInterface = {
    dispatch,
    state: getState(),
  };
  log.info('Viewer Initialized');
  return api;
};

export default viewer;
