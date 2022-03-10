import { ActionDispatcher, RemoveSearchHighlights } from '../../model';
import removeLayerHighlights from '../../utils/highlights/removeLayerHighlights';

// eslint-disable-next-line @typescript-eslint/require-await
const removeSearchHighlights: ActionDispatcher<RemoveSearchHighlights> = async ({ state }) => {
  const { searchTermsHighlightsNode, contentWrapperNode } = state;
  if (searchTermsHighlightsNode) {
    removeLayerHighlights(searchTermsHighlightsNode);
  }
  if (contentWrapperNode) {
    contentWrapperNode.querySelectorAll('[data-highlighted]').forEach((element) => {
      element.setAttribute('data-highlighted', '');
    });
  }
  return {
    searchRanges: [],
    searchTerms: [],
  };
};

export default removeSearchHighlights;
