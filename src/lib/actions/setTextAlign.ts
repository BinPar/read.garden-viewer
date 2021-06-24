import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetTextAlign } from '../../model/actions/flow';
import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

import { drawHighlights } from '../../utils/highlights';
import removeCSSProperty from '../../utils/removeCSSProperty';
import setCSSProperty from '../../utils/setCSSProperty';
import recalculate from '../../viewer/recalculate';
import { clean } from '../../utils/highlights/search';
import { getState, updateState } from '../state';
import removeUserHighlights from '../../utils/highlights/removeUserHighlights';
import redrawUserHighlights from '../../utils/highlights/redrawUserHighlights';
import clearSelection from '../../utils/highlights/clearSelection';
import { removeExtensors } from '../../utils/highlights/drawExtensors';
import removeSelectionMenu from '../../utils/highlights/removeSelectionMenu';
import removeNotesDialog from '../../utils/highlights/removeNotesDialog';

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
      clean(state);
      clearSelection(state);
      removeExtensors(state);
      removeSelectionMenu(state);
      removeNotesDialog(state);
      removeUserHighlights(state);
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
          await redrawUserHighlights(state);
          if (state.searchRanges.length && state.searchTermsHighlightsNode) {
            drawHighlights(state.searchTermsHighlightsNode, state.searchRanges);
          }
        });
      });
    });
  }
  return {};
};

export default setTextAlign;
