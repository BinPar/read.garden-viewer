import { getState, updateState } from '../../../lib/state';
import drawHighlights from '../drawHighlights';
import getRangesRecursively from './getRangesRecursively';

/**
 * Looks for appearances of terms and draws highlights
 * @param terms Terms to highlight
 */
const highlightTerms = (terms: string[]): void => {
  const { contentPlaceholderNode, searchTermsHighlightsNode, layout } = getState();
  if (searchTermsHighlightsNode && terms.length) {
    if (contentPlaceholderNode) {
      const ranges = getRangesRecursively(contentPlaceholderNode, terms, layout !== 'fixed');
      drawHighlights(searchTermsHighlightsNode, ranges, layout === 'fixed');
      updateState({ searchRanges: ranges });
    }
  }
};

export default highlightTerms;
