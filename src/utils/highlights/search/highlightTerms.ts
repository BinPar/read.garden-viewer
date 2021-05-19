import { getScrollLeftPosition } from '..';
import { getState } from '../../../lib/state';
import { LayoutTypes } from '../../../model/state';
import drawHighlights from '../drawHighlights';
import getRangesRecursively from './getRangesRecursively';

/**
 * Looks for appearances of terms and draws highlights
 * @param terms Terms to highlight
 */
const highlightTerms = (terms: string[]): void => {
  const state = getState();

  const { contentPlaceholderNode, searchTermsHighlightsNode } = state;

  if (searchTermsHighlightsNode && terms.length) {
    if (state.layout === LayoutTypes.Flow) {
      if (contentPlaceholderNode) {
        const ranges = getRangesRecursively(contentPlaceholderNode, terms, true);
        drawHighlights(searchTermsHighlightsNode, ranges);
      }
    }

    if (state.layout === LayoutTypes.Fixed && !state.loadingContent) {
      const { contentsInfo, scrollMode, contentsByOrder } = state;
      if (scrollMode === 'horizontal') {
        const leftLimit = getScrollLeftPosition();
        const rightLimit = leftLimit + window.innerWidth;
        let startFound = false;
        let endFound = false;
        const ranges: Range[] = [];
        for (let i = 0, l = contentsInfo.length; i < l && (!startFound || !endFound); i++) {
          const { maxLeft, order, container } = contentsInfo[i];
          if (startFound) {
            ranges.push(...getRangesRecursively(container, terms, true));
            if (maxLeft > rightLimit) {
              endFound = true;
              const next = contentsByOrder.get(order + 1);
              if (next) {
                ranges.push(...getRangesRecursively(next.container, terms, true));
              }
            }
          } else if (maxLeft > leftLimit) {
            startFound = true;
            if (order > 0) {
              const previous = contentsByOrder.get(order - 1);
              if (previous) {
                ranges.push(...getRangesRecursively(previous.container, terms, true));
              }
            }
            ranges.push(...getRangesRecursively(container, terms, true));
          }
        }
        drawHighlights(searchTermsHighlightsNode, ranges, true);
      }
      if (scrollMode === 'vertical') {
        throw new Error('Search highlighting is not implemented in fixed vertical viewer');
      }
    }
  }
};

export default highlightTerms;
