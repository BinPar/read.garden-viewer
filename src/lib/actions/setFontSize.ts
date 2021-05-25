import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetFontSize } from '../../model/actions/flow';
import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

import { drawHighlights } from '../../utils/highlights';
import { clean } from '../../utils/highlights/search';
import setCSSProperty from '../../utils/setCSSProperty';
import recalculate from '../../viewer/recalculate';
import { updateState } from '../state';

/**
 * Sets font size to provided value and recalculates
 * @param size New font size
 * @param state Viewer state
 * @returns Update state
 */
export const setSize = async (size: number, state: State): Promise<Partial<State>> => {
  if (state.layout === LayoutTypes.Fixed) {
    throw new Error('Action not allowed in fixed mode');
  }
  return new Promise<Partial<State>>((resolve) => {
    setCSSProperty('viewer-margin-top', '200vh');
    clean();
    setCSSProperty('font-size', `${size}px`);
    updateState({ fontSize: size });
    recalculate(state).then((recalculateUpdate) => {
      setCSSProperty('viewer-margin-top', '0');
      resolve({
        ...recalculateUpdate,
        layout: state.layout,
        scrollMode: state.scrollMode,
        fontSize: size,
      });
      if (state.searchRanges.length && state.searchTermsHighlightsNode) {
        drawHighlights(state.searchTermsHighlightsNode, state.searchRanges);
      }
    });
  });
};

/**
 * Sets font size to specific provided value (after normalizing with max and min)
 * @param context.state Viewer state
 * @param context.action Viewer action, containing desired new font size
 * @returns Update state
 */
const setFontSize: ActionDispatcher<SetFontSize> = async ({ state, action }) => {
  if (state.layout === LayoutTypes.Fixed) {
    throw new Error('Action not allowed in fixed mode');
  }
  const {
    config: {
      fontSize: { max, min, step },
    },
  } = state;
  const desiredSize = step * Math.round(action.size / step);
  const newSize = Math.min(Math.max(desiredSize, min), max);
  if (newSize !== state.fontSize) {
    return setSize(newSize, state);
  }
  return {};
};

export default setFontSize;
