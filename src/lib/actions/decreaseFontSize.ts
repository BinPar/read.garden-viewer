import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { IncreaseFontSize } from '../../model/actions/flow';
import { LayoutTypes, State } from '../../model/state';
import { setSize } from './setFontSize';

/**
 * Decreases font size (if min is not reached) by the step value provided in config
 * @param context.state Viewer state 
 * @returns Update state
 */
const decreaseFontSize: ActionDispatcher<IncreaseFontSize> = async ({
  state,
}): Promise<Partial<State>> => {
  if (state.layout === LayoutTypes.Fixed) {
    throw new Error('Action not allowed in fixed mode');
  }
  const newSize = Math.max(state.fontSize - state.config.fontSize.step, state.config.fontSize.min);
  if (newSize !== state.fontSize) {
    return setSize(newSize, state);
  }
  return {};
};

export default decreaseFontSize;
