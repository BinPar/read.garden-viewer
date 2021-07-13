/* eslint-disable no-param-reassign */
import getId from 'shortid';

import { OnLinkClick } from '../model';

import { getState } from '../lib/state';

const handleAnchors = (element: HTMLElement, state = getState()): void => {
  if (state.config.eventHandler) {
    const anchors = element.querySelectorAll('a');
    anchors.forEach((a) => {
      const id = `link-${getId()}`;
      a.dataset.link = id;
      a.onclick = (e): void => {
        e.preventDefault();
        const event: OnLinkClick = {
          type: 'onLinkClick',
          slug: state.slug,
          url: a.getAttribute('href'),
          querySelector: `[data-link="${id}"]`,
        };
        state.config.eventHandler!(event);
      };
    });
  }
};

export default handleAnchors;