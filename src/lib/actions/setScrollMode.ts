import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetScrollMode } from '../../model/actions/global';
import { State } from '../../model/state';
import setCSSProperty from '../../utils/setCSSProperty';
import recalculate from '../../viewer/recalculate';
import { getState, updateState } from '../state';

/**
 * Sets scroll mode to provided mode and recalculates
 * @param context.state  Viewer state
 * @param context.action  Viewer action, containing desired new font family
 * @returns State update
 */
const setScrollMode: ActionDispatcher<SetScrollMode> = async ({ state, action }) => {
  if (state.scrollMode === 'fixed') {
    throw new Error('Action not allowed in fixed mode');
  }
  const { scrollMode } = action;
  if (state.scrollMode !== scrollMode) {
    return new Promise<Partial<State>>((resolve) => {
      const { readGardenViewerNode } = state as Required<State>;
      setCSSProperty('viewer-margin-top', '200vh');
      readGardenViewerNode.classList.remove(`rg-${state.scrollMode}-scroll`);
      readGardenViewerNode.classList.add(`rg-${scrollMode}-scroll`);
      window.requestAnimationFrame(async (): Promise<void> => {
        updateState({ scrollMode });
        const newState = getState();
        const recalculateUpdate = await recalculate(newState);
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
