import { LayoutTypes } from '../../../model/viewerSettings';

import { getState, updateState } from '../../../lib/state';
import drawHighlights from '../drawHighlights';
import getRangesRecursively from './getRangesRecursively';

const getContainerRanges = (container: HTMLDivElement, terms: string[]): Range[] => {
  if (
    container.firstElementChild &&
    window.getComputedStyle(container.firstElementChild).display !== 'none'
  ) {
    return getRangesRecursively(container, terms, true);
  }
  return [];
};

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
        const content = state.contentsBySlug.get(state.contentSlug)!;
        const currentPosition = state.positionBySlug.get(state.contentSlug)!;
        const visibleWidth = state.containerWidth / (state.scale * state.zoom);
        const leftLimit = currentPosition - content.width;
        const rightLimit = currentPosition + content.width + visibleWidth;
        const startingElementIndex = Math.floor((leftLimit * contentsInfo.length) / totalWidth) - 2;
        for (
          let i = Math.max(0, startingElementIndex), l = contentsInfo.length;
          i < l && (!startFound || !endFound);
          i++
        ) {
          const { maxLeft, order, container } = contentsInfo[i];
          if (startFound) {
            ranges.push(...getContainerRanges(container, terms));
            if (maxLeft > rightLimit) {
              endFound = true;
              const next = contentsByOrder.get(order + 1);
              if (next) {
                ranges.push(...getContainerRanges(next.container, terms));
              }
            }
          } else if (maxLeft > leftLimit) {
            startFound = true;
            if (order > 0) {
              const previous = contentsByOrder.get(order - 1);
              if (previous) {
                ranges.push(...getContainerRanges(previous.container, terms));
              }
            }
            ranges.push(...getContainerRanges(container, terms));
          }
        }
      }
      if (scrollMode === 'vertical') {
        const content = state.contentsBySlug.get(state.contentSlug)!;
        const currentPosition = state.positionBySlug.get(state.contentSlug)!;
        const visibleHeight = state.containerHeight / (state.scale * state.zoom);
        const topLimit = currentPosition - content.height;
        const bottomLimit = currentPosition + content.height + visibleHeight;
        const startingElementIndex = Math.floor((topLimit * contentsInfo.length) / totalHeight) - 2;
        for (
          let i = Math.max(0, startingElementIndex), l = contentsInfo.length;
          i < l && (!startFound || !endFound);
          i++
        ) {
          const { maxTop, order, container } = contentsInfo[i];
          if (startFound) {
            ranges.push(...getContainerRanges(container, terms));
            if (maxTop > bottomLimit) {
              endFound = true;
              const next = contentsByOrder.get(order + 1);
              if (next) {
                ranges.push(...getContainerRanges(next.container, terms));
              }
            }
          } else if (maxTop > topLimit) {
            startFound = true;
            if (order > 0) {
              const previous = contentsByOrder.get(order - 1);
              if (previous) {
                ranges.push(...getContainerRanges(previous.container, terms));
              }
            }
            ranges.push(...getContainerRanges(container, terms));
          }
        }
      }
      drawHighlights(searchTermsHighlightsNode, ranges, true);
      updateState({ searchRanges: [...state.searchRanges, ...ranges] });
    }
  }
};

export default highlightTerms;
