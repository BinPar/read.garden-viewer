import { SyntheticEvent } from '../../model/dom';

import { getState } from '../../lib/state';

const getClickedLink = (
  syntheticEvent: SyntheticEvent,
  state = getState(),
): HTMLAnchorElement | null => {
  const { contentPlaceholderNode } = state;
  let clickedLink: HTMLAnchorElement | null = null;
  let element = document.elementFromPoint(syntheticEvent.clientX, syntheticEvent.clientY);
  while (!clickedLink && element && element.parentElement && element !== contentPlaceholderNode) {
    if (element.nodeName === 'A') {
      clickedLink = element as HTMLAnchorElement;
    }
    element = element.parentElement;
  }
  return clickedLink;
};

export default getClickedLink;
