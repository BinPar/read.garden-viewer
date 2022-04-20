import { unmountAnimations } from '../lib/animation/animationController';
import { getState, updateState } from '../lib/state';
import { removeAllChangeEvents } from '../lib/state/stateChangeEvents';
import cleanStyles from './cleanStyles';
import { cleanDOM } from './createBasicDOMElements';
import { removeGlobalEvents } from './globalEvents';
import removeCSSProperty from './removeCSSProperty';
import setCSSProperty from './setCSSProperty';

const unmount = (state = getState()): void => {
  setCSSProperty('viewer-margin-top', '200vh');
  updateState({ unmounted: true });
  removeGlobalEvents(state);
  removeAllChangeEvents();
  cleanDOM(state);
  cleanStyles(state);
  unmountAnimations();
  removeCSSProperty('viewer-margin-top');
};

export default unmount;
