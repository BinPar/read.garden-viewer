import { State } from '../model/state';
import { LayoutTypes } from '../model/viewerSettings';

import { updateState } from '../lib/state';

/**
 * Updates positions maps for if fixed layout (meant to be used on scroll mode change)
 * @param state Viewer state
 */
const updatePositionsMaps = (state: State): void => {
  if (state.layout === LayoutTypes.Fixed) {
    const { contentsInfo } = state;
    const positionKey = state.scrollMode === 'horizontal' ? 'left' : 'top';
    const positionBySlug = new Map<string, number>();
    const slugByPosition = new Map<number, string>();
    for (let i = 0, l = contentsInfo.length; i < l; i++) {
      const content = contentsInfo[i];
      const { slug } = content;
      const position = content[positionKey];
      positionBySlug.set(slug, position);
      slugByPosition.set(position, slug);
    }
    updateState({ positionBySlug, slugByPosition });
  }
};

export default updatePositionsMaps;
