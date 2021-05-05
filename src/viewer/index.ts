import log from 'loglevel';
import { getState, initializeState } from '../lib/state';
import { APIInterface } from '../model/apiInterface';
import dispatch from '../lib/state/dispatch';
import { ViewerFunction } from '../model/viewer';
import createBasicDOMElements from './createBasicDOMElements';

const viewer: ViewerFunction = (config) => {
  initializeState(config);
  const api: APIInterface = {
    dispatch,
    state: getState(),    
  };
  createBasicDOMElements(api.state);  
//  dispatch
  log.info('Viewer Initialized');
  return api;
};

export default viewer;
