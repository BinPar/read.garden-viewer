import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetScrollMode } from '../../model/actions/global';
import { State } from '../../model/state';
import { drawHighlights } from '../../utils/highlights';
import { clean } from '../../utils/highlights/search';
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
      clean();
      document.body.classList.remove(`rg-${state.scrollMode}-scroll`);
      document.body.classList.add(`rg-${scrollMode}-scroll`);
      updateState({ scrollMode });
      recalculate(state).then((recalculateUpdate) => {
        setCSSProperty('viewer-margin-top', '0');
        resolve({
          ...recalculateUpdate,
          layout: state.layout,
          scrollMode,
        });
        if (state.searchRanges.length && state.searchTermsHighlightsNode) {
          drawHighlights(state.searchTermsHighlightsNode, state.searchRanges);
        }
      });
    });
  }
  return {};
};

export default setScrollMode;
