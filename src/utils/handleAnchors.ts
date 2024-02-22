/* eslint-disable no-param-reassign */
import { OnLinkLoaded } from '../model/events';

import { getState } from '../lib/state';

const handleAnchors = (element: HTMLElement, state = getState()): void => {
  if (state.config.eventHandler) {
    const anchors = element.querySelectorAll('a');
    anchors.forEach((a) => {
      const id = `${Math.random().toString(16).slice(2)}`;
      const link = `link-${id}`;
      a.dataset.link = link;
      a.onclick = (e): void => {
        e.preventDefault();
      };
      if (state.config.eventHandler) {
        const event: OnLinkLoaded = {
          type: 'onLinkLoaded',
          slug: state.slug,
          link,
          href: a.getAttribute('href'),
          target: a.getAttribute('target'),
        };
        state.config.eventHandler(event).catch((ex) => {
          const { message, stack } = ex as Error;
          console.error('Error at event handler', stack || message);
        });
      }
    });
  }
};

export default handleAnchors;
