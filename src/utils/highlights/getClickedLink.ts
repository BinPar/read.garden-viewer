import { SyntheticEvent } from '../../model/dom';

import { getState } from '../../lib/state';

/**
 * Link margin in pixels
 */
const linkMargin = 5;

const detectLinkInFixedPage = (
  element: Element,
  syntheticEvent: SyntheticEvent,
): HTMLAnchorElement | null => {
  const linkNodes = element.querySelectorAll('a div');
  for (let i = 0; i < linkNodes.length; i++) {
    const linkNode = linkNodes[i];
    const rects = linkNode.getClientRects();
    for (let j = 0; j < rects.length; j++) {
      const rect = rects[j];
      if (rect) {
        if (
          rect.left - linkMargin <= syntheticEvent.clientX &&
          rect.right + linkMargin >= syntheticEvent.clientX &&
          rect.top - linkMargin <= syntheticEvent.clientY &&
          rect.bottom + linkMargin >= syntheticEvent.clientY
        ) {
          return linkNode.parentElement as HTMLAnchorElement;
        }
      }
    }
  }
  return null;
};

const getClickedLink = (
  syntheticEvent: SyntheticEvent,
  state = getState(),
): HTMLAnchorElement | null => {
  const { contentPlaceholderNode } = state;
  let clickedLink: HTMLAnchorElement | null = null;
  let element = document.elementFromPoint(syntheticEvent.clientX, syntheticEvent.clientY);
  while (!clickedLink && element && element.parentElement && element !== contentPlaceholderNode) {
    if (element.classList.contains('rg-fixed-content-container')) {
      return detectLinkInFixedPage(element, syntheticEvent);
    }
    if (element.nodeName === 'A') {
      clickedLink = element as HTMLAnchorElement;
    }
    element = element.parentElement;
  }
  return clickedLink;
};

export default getClickedLink;
