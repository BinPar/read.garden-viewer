import { getState, updateState } from '../lib/state';
import { removeAllChangeEvents } from '../lib/state/stateChangeEvents';
import { cleanDOM } from './createBasicDOMElements';
import { removeGlobalEvents } from './globalEvents';

const unmount = (state = getState()): void => {
  updateState({ unmounted: true });
  removeGlobalEvents(state);
  removeAllChangeEvents();
  cleanDOM(state);
};

export default unmount;
