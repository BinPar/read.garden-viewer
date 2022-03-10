import { ActionDispatcher, LayoutTypes, SetLineHeight, State } from '../../model';
import { drawHighlights } from '../../utils/highlights';
import clearSelection from '../../utils/highlights/clearSelection';
import { removeExtensors } from '../../utils/highlights/drawExtensors';
import redrawUserHighlights from '../../utils/highlights/redrawUserHighlights';
import removeNotesDialog from '../../utils/highlights/removeNotesDialog';
import removeSelectionMenu from '../../utils/highlights/removeSelectionMenu';
import removeUserHighlights from '../../utils/highlights/removeUserHighlights';
import { clean } from '../../utils/highlights/search';
import setCSSProperty from '../../utils/setCSSProperty';
import recalculate from '../../viewer/recalculate';

const setLineHeight: ActionDispatcher<SetLineHeight> = async ({ state, action }) => {
  if (state.layout === LayoutTypes.Fixed) {
    throw new Error('Action not allowed in fixed mode');
  }

  if (action.lineHeight !== state.lineHeight) {
    return new Promise<Partial<State>>((resolve) => {
      setCSSProperty('viewer-margin-top', '200vh');
      clean(state);
      clearSelection(state);
      removeExtensors(state);
      removeSelectionMenu(state);
      removeNotesDialog(state);
      removeUserHighlights(state);
      setCSSProperty('line-height', `${action.lineHeight}em`);
      recalculate(state)
        .then(async (recalculateUpdate): Promise<void> => {
          setCSSProperty('viewer-margin-top', '0');
          resolve({
            ...recalculateUpdate,
            layout: state.layout,
            scrollMode: state.scrollMode,
            lineHeight: action.lineHeight,
          });
          await redrawUserHighlights(state);
          if (state.searchRanges.length && state.searchTermsHighlightsNode) {
            drawHighlights(state.searchTermsHighlightsNode, state.searchRanges);
          }
        })
        .catch((ex) => {
          const { stack, message } = ex as Error;
          console.error('Error at recalculate', stack || message);
        });
    });
  }

  return {};
};

export default setLineHeight;
