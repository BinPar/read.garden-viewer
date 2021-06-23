import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { NavigateToNextChapter } from '../../model/actions/flow';
import { LoadNextChapter } from '../../model/events';
import { LayoutTypes } from '../../model/viewerSettings';

const navigateToNextChapter: ActionDispatcher<NavigateToNextChapter> = async ({ state }) => {
  if (state.layout === LayoutTypes.Fixed) {
    throw new Error('Action not allowed in fixed mode');
  }
  if (state.config.eventHandler) {
    const [currentContentSlug] = Array.from(state.positionBySlug.keys()).slice(-1);
    const event: LoadNextChapter = {
      type: 'loadNextChapter',
      slug: state.slug,
      currentContentSlug,
    };
    state.config.eventHandler(event);
  }
  return {};
};

export default navigateToNextChapter;
