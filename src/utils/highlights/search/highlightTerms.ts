import { LayoutTypes } from '../../../model/viewerSettings';

import { getState, updateState } from '../../../lib/state';
import getScrollLeftPosition from '../getScrollLeftPosition';
import drawHighlights from '../drawHighlights';
import getScrollTopPosition from '../getScrollTopPosition';
import getRangesRecursively from './getRangesRecursively';
import setCSSProperty from '../../setCSSProperty';

/**
 * Looks for appearances of terms and draws highlights
 * @param terms Terms to highlight
 */
const highlightTerms = (terms: string[]): void => {
  const state = getState();

  const { contentPlaceholderNode, searchTermsHighlightsNode } = state;

  if (searchTermsHighlightsNode && terms.length) {
    setCSSProperty('user-select', 'auto');
    if (state.layout === LayoutTypes.Flow) {
      if (contentPlaceholderNode) {
        const ranges = getRangesRecursively(contentPlaceholderNode, terms, true);
        drawHighlights(searchTermsHighlightsNode, ranges);
        updateState({ searchRanges: ranges });
      }
    }

    if (
      state.layout === LayoutTypes.Fixed &&
      state.scrollMode !== 'fixed' &&
      !state.loadingContent
    ) {
      const { contentsInfo, scrollMode, contentsByOrder, totalWidth, totalHeight } = state;
      let startFound = false;
      let endFound = false;
      const ranges: Range[] = [];
      if (scrollMode === 'horizontal') {
        const leftLimit = getScrollLeftPosition(state);
        const rightLimit = leftLimit + window.innerWidth;
        const startingElementIndex = Math.floor((leftLimit * contentsInfo.length) / totalWidth) - 2;
        for (
          let i = Math.max(0, startingElementIndex), l = contentsInfo.length;
          i < l && (!startFound || !endFound);
          i++
        ) {
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
      }
      if (scrollMode === 'vertical') {
        const topLimit = getScrollTopPosition(state);
        const bottomLimit = topLimit + document.body.clientHeight;
        const startingElementIndex = Math.floor((topLimit * contentsInfo.length) / totalHeight) - 2;
        for (
          let i = Math.max(0, startingElementIndex), l = contentsInfo.length;
          i < l && (!startFound || !endFound);
          i++
        ) {
          const { maxTop, order, container } = contentsInfo[i];
          if (startFound) {
            ranges.push(...getRangesRecursively(container, terms, true));
            if (maxTop > bottomLimit) {
              endFound = true;
              const next = contentsByOrder.get(order + 1);
              if (next) {
                ranges.push(...getRangesRecursively(next.container, terms, true));
              }
            }
          } else if (maxTop > topLimit) {
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
      }
      drawHighlights(searchTermsHighlightsNode, ranges, true);
      updateState({ searchRanges: [...state.searchRanges, ...ranges] });
    }
  }
};

export default highlightTerms;
