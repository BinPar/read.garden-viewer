import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { NavigateToNextChapter } from '../../model/actions/flow';
import { LoadNextChapter } from '../../model/events';
import { LayoutTypes } from '../../model/viewerSettings';

// eslint-disable-next-line @typescript-eslint/require-await
const navigateToNextChapter: ActionDispatcher<NavigateToNextChapter> = async ({ state }) => {
  if (state.layout === LayoutTypes.Fixed) {
    throw new Error('Action not allowed in fixed mode');
  }
  if (state.config.eventHandler) {
    const [currentContentSlug] = Array.from(state.positionBySlug.keys()).slice(-1);
    const event: LoadNextChapter = {
      type: 'loadNextChapter',
      slug: state.slug,
      productSlug: state.productSlug,
      currentContentSlug,
    };
    state.config.eventHandler(event).catch((ex) => {
      const { stack, message } = ex as Error;
      console.error('Error at event handler', stack || message);
    });
  }
  return {};
};

export default navigateToNextChapter;
