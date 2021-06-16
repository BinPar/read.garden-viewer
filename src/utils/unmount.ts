import { getState } from '../lib/state';
import { cleanDOM } from './createBasicDOMElements';
import { removeGlobalEvents } from './globalEvents';

const unmount = (): void => {
  const state = getState();
  removeGlobalEvents(state);
  cleanDOM(state);
};

export default unmount;
