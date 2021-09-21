import { getState, updateState } from '../../../lib/state';
import drawHighlights from '../drawHighlights';
import getRangesRecursively from './getRangesRecursively';

/**
 * Looks for appearances of terms and draws highlights
 * @param terms Terms to highlight
 */
const highlightTerms = (terms: string[]): void => {
  const { contentPlaceholderNode, searchTermsHighlightsNode } = getState();
  if (searchTermsHighlightsNode && terms.length) {
    if (contentPlaceholderNode) {
      const ranges = getRangesRecursively(contentPlaceholderNode, terms, true);
      drawHighlights(searchTermsHighlightsNode, ranges);
      updateState({ searchRanges: ranges });
    }
  }
};

export default highlightTerms;
