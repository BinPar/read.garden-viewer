import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { ClearSelection } from '../../model/actions/global';
import removeHighlights from '../../utils/highlights/removeHighlights';

const clearSelection: ActionDispatcher<ClearSelection> = async ({ state }) => {
  if (state.selectionHighlightsNode) {
    removeHighlights(state.selectionHighlightsNode);
  }
  return {};
};

export default clearSelection;