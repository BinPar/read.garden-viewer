import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetFontSize } from '../../model/actions/flow';
import { LayoutTypes, State } from '../../model/state';
import setCSSProperty from '../../utils/setCSSProperty';
import recalculate from '../../viewer/recalculate';

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
  setCSSProperty('viewer-margin-top', '200vh');
  setCSSProperty('font-size', `${size}px`);
  const recalculateUpdate = await recalculate({
    ...state,
    fontSize: size,
  });
  setCSSProperty('viewer-margin-top', '0');
  return {
    ...recalculateUpdate,
    fontSize: size,
  } as Partial<State>;
};

/**
 * Sets font size to specific provided value (after normalizing with max and min)
 * @param param0 Viewer action containing new desired font size
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
