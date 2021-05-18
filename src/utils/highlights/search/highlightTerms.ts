import { getState } from '../../../lib/state';
import drawHighlights from '../drawHighlights';
import getSearchHighlightsRanges from './getSearchHighlightsRanges';

/**
 * Looks for appearances of terms and draws highlights
 * @param terms Terms to highlight
 */
const highlightTerms = (terms: string[]): void => {
  const state = getState();

  const { contentWrapperNode, searchTermsHighlightsNode } = state;

  if (contentWrapperNode && searchTermsHighlightsNode && terms.length) {
    const ranges = getSearchHighlightsRanges(contentWrapperNode, terms);
    drawHighlights(searchTermsHighlightsNode, ranges);
  }
};

export default highlightTerms;
