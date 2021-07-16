import { unmountAnimations } from '../lib/animation/animationController';
import { getState, updateState } from '../lib/state';
import { removeAllChangeEvents } from '../lib/state/stateChangeEvents';
import cleanStyles from './cleanStyles';
import { cleanDOM } from './createBasicDOMElements';
import { removeGlobalEvents } from './globalEvents';

const unmount = (state = getState()): void => {
  updateState({ unmounted: true });
  removeGlobalEvents(state);
  removeAllChangeEvents();
  cleanDOM(state);
  cleanStyles(state);
  unmountAnimations();
};

export default unmount;
