import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetTextAlign } from '../../model/actions/flow';
import { LayoutTypes, State } from '../../model/state';
import removeCSSProperty from '../../utils/removeCSSProperty';
import setCSSProperty from '../../utils/setCSSProperty';
import recalculate from '../../viewer/recalculate';
import { getState, updateState } from '../state';

/**
 * Sets viewer text align mode
 * @param context.state Viewer state 
 * @param context.action Viewer action
 * @returns Viewer partial state update
 */
const setTextAlign: ActionDispatcher<SetTextAlign> = async ({ state, action }) => {
  if (state.layout === LayoutTypes.Fixed) {
    throw new Error('Action not allowed in fixed mode');
  }
  const { textAlign } = action;
  if (textAlign !== state.textAlign) {
    const { contentWrapperNode } = state as Required<State>;
    return new Promise<Partial<State>>((resolve) => {
      setCSSProperty('viewer-margin-top', '200vh');
      window.requestAnimationFrame(() => {
        if (textAlign) {
          contentWrapperNode.classList.add('rg-force-text-align');
          setCSSProperty('text-align', textAlign);
        } else {
          contentWrapperNode.classList.remove('rg-force-text-align');
          removeCSSProperty('text-align');
        }
        window.requestAnimationFrame(async (): Promise<void> => {
          updateState({ textAlign });
          const newState = getState();
          const recalculateUpdate = await recalculate(newState);
          setCSSProperty('viewer-margin-top', '0');
          resolve({
            ...recalculateUpdate,
            layout: state.layout,
            scrollMode: state.scrollMode,
            textAlign,
          });
        });
      });
    });
  }
  return {};
};

export default setTextAlign;
