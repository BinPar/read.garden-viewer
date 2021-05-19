import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetScrollMode } from '../../model/actions/global';
import { State } from '../../model/state';
import setCSSProperty from '../../utils/setCSSProperty';
import recalculate from '../../viewer/recalculate';
import { updateState } from '../state';

/**
 * Sets scroll mode to provided mode and recalculates
 * @param context.state  Viewer state
 * @param context.action  Viewer action, containing desired new font family
 * @returns State update
 */
const setScrollMode: ActionDispatcher<SetScrollMode> = async ({ state, action }) => {
  const { scrollMode } = action;
  if (state.scrollMode !== scrollMode) {
    return new Promise<Partial<State>>((resolve) => {
      setCSSProperty('viewer-margin-top', '200vh');
      document.body.classList.remove(`rg-${state.scrollMode}-scroll`);
      document.body.classList.add(`rg-${scrollMode}-scroll`);
      window.requestAnimationFrame(async (): Promise<void> => {
        updateState({ scrollMode });
        const recalculateUpdate = await recalculate(state);
        setCSSProperty('viewer-margin-top', '0');
        resolve({
          ...recalculateUpdate,
          layout: state.layout,
          scrollMode,
        });
      });
    });
  }
  return {};
};

export default setScrollMode;
