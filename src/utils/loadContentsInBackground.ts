import { LoadNewContent } from '../model/events';
import { LayoutTypes } from '../model/viewerSettings';

import { getState, updateState } from '../lib/state';
import { highlightTerms } from './highlights/search';

/**
 * Loads contents in background. Meant for fixed viewer in scroll mode
 */
const loadContentsInBackground = async (state = getState(), currentContentSlug?: string): Promise<void> => {
  if (state.layout === LayoutTypes.Flow) {
    throw new Error('Loading contents in background is not available in flow layout');
  }
  if (!state.unmounted && !state.loadingContent) {
    const {
      contentSlug,
      contentsByOrder,
      contentsBySlug,
      config: { fixedViewerPreloadOrder },
    } = state;
    const { order: currentContentIndex } = contentsBySlug.get(currentContentSlug || contentSlug)!;
    const indexToLoad = fixedViewerPreloadOrder.find((i) => {
      const index = currentContentIndex + i;
      if (index < 0) {
        return false;
      }
      const content = contentsByOrder.get(index);
      if (!content) {
        return false;
      }
      return !content.html;
    });
    if (indexToLoad !== undefined) {
      const content = contentsByOrder.get(currentContentIndex + indexToLoad);
      if (state.config.eventHandler && content) {
        const event: LoadNewContent = {
          type: 'loadNewContent',
          slug: state.slug,
          contentSlug: content.slug,
        };
        updateState({ loadingContent: content.slug });
        state.config.eventHandler(event);
      }
    } else {
      highlightTerms(state.searchTerms);
    }
  }
};

export default loadContentsInBackground;
