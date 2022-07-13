import { LoadNewContent } from '../model/events';
import { LayoutTypes } from '../model/viewerSettings';

import { getState, updateState } from '../lib/state';

/**
 * Loads contents in background. Meant for fixed viewer in scroll mode
 */
const loadContentsInBackground = (state = getState(), currentContentSlug?: string): void => {
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
    const slugContent = contentsBySlug.get(currentContentSlug || contentSlug);
    if (!slugContent) {
      throw new Error(
        `Couldn't find content by slug: ${JSON.stringify({ currentContentSlug, contentSlug })}`,
      );
    }
    const { order: currentContentIndex } = slugContent;
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
          productSlug: state.productSlug,
          contentSlug: content.slug,
        };
        updateState({ loadingContent: content.slug });
        state.config.eventHandler(event).catch((ex) => {
          const { stack, message } = ex as Error;
          console.error('Error at event handler', stack || message);
        });
      }
    }
  }
};

export default loadContentsInBackground;
