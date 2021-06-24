import { getState, updateState } from '../lib/state';
import { cleanDOM } from './createBasicDOMElements';
import { removeGlobalEvents } from './globalEvents';

const unmount = (state = getState()): void => {
  updateState({ unmounted: true });
  removeGlobalEvents(state);
  cleanDOM(state);
};

export default unmount;
