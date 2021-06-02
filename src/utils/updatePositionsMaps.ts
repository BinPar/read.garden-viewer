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
    const positionByLabel = new Map<string, number>();
    const labelByPosition = new Map<number, string>();
    for (let i = 0, l = contentsInfo.length; i < l; i++) {
      const content = contentsInfo[i];
      const { label } = content;
      const position = content[positionKey];
      positionByLabel.set(label, position);
      labelByPosition.set(position, label);
    }
    updateState({ positionByLabel, labelByPosition });
  }
};

export default updatePositionsMaps;
