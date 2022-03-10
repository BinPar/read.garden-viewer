import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { NavigateToPreviousChapter } from '../../model/actions/flow';
import { LoadPreviousChapter } from '../../model/events';
import { LayoutTypes } from '../../model/viewerSettings';

const navigateToPreviousChapter: ActionDispatcher<NavigateToPreviousChapter> = async ({
  state,
  action,
  // eslint-disable-next-line @typescript-eslint/require-await
}) => {
  if (state.layout === LayoutTypes.Fixed) {
    throw new Error('Action not allowed in fixed mode');
  }
  if (state.config.eventHandler) {
    const [currentContentSlug] = Array.from(state.positionBySlug.keys());
    const event: LoadPreviousChapter = {
      type: 'loadPreviousChapter',
      slug: state.slug,
      productSlug: state.productSlug,
      currentContentSlug,
      goToEnd: action.goToEnd,
    };
    state.config.eventHandler(event).catch((ex) => {
      const { stack, message } = ex as Error;
      console.error('Error at event handler', stack || message);
    });
  }
  return {};
};

export default navigateToPreviousChapter;
