import { getState, updateState } from '../lib/state';
import { LoadNewContent } from '../model/events';
import { LayoutTypes } from '../model/state';

const loadContentsInBackground = async (): Promise<void> => {
  const state = getState();
  if (state.layout === LayoutTypes.Flow) {
    throw new Error('Loading contents in background is not available in flow layout');
  }
  if (!state.loadingContent) {
    const {
      contentsByOrder,
      currentContentIndex,
      config: { fixedViewerPreloadOrder },
    } = state;
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
      const content = contentsByOrder.get(currentContentIndex + indexToLoad)!;
      const event: LoadNewContent = {
        type: 'loadNewContent',
        slug: state.slug,
        contentSlug: content.slug,
      };
      if (state.config.eventHandler) {
        updateState({ loadingContent: true });
        state.config.eventHandler(event);
      }
    }
  }
};

export default loadContentsInBackground;