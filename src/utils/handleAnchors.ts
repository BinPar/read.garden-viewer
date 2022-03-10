/* eslint-disable no-param-reassign */
import { generate } from 'shortid';

import { getState } from '../lib/state';

const handleAnchors = (element: HTMLElement, state = getState()): void => {
  if (state.config.eventHandler) {
    const anchors = element.querySelectorAll('a');
    anchors.forEach((a) => {
      const id = generate();
      const link = `link-${id}`;
      a.dataset.link = link;
      a.onclick = (e): void => {
        e.preventDefault();
      };
    });
  }
};

export default handleAnchors;
