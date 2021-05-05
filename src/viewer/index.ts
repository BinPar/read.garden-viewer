import log from 'loglevel';
import { getState, initializeState } from '../lib/state';
import { APIInterface } from '../model/apiInterface';
import dispatch from '../lib/state/dispatch';
import { ViewerFunction } from '../model/viewer';
import createBasicDOMElements from './createBasicDOMElements';
import { LoadNewContent } from '../model/events';

const viewer: ViewerFunction = (config) => {
  initializeState(config);
  const state = getState();
  const api: APIInterface = {
    dispatch,
    state,
  };
  createBasicDOMElements(api.state);
  const loadNewContent: LoadNewContent = {
    type: 'loadNewContent',
    contentSlug: config.contentSlug,
    label: config.startPageLabel,
  };  
  state.config.eventHandler(loadNewContent);
  log.info('Viewer Initialized');
  return api;
};

export default viewer;
