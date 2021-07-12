import { SyntheticEvent } from '../../model/dom';

import { getState } from '../../lib/state';

const isClickOnLink = (syntheticEvent: SyntheticEvent, state = getState()): boolean => {
  const { contentPlaceholderNode } = state;
  let linkClicked = false;
  let element = document.elementFromPoint(syntheticEvent.clientX, syntheticEvent.clientY);
  while (!linkClicked && element && element.parentElement && element !== contentPlaceholderNode) {
    linkClicked = element.nodeName === 'A';
    element = element.parentElement;
  }
  return linkClicked;
};

export default isClickOnLink;