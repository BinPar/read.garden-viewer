import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { NavigateToPreviousChapter } from '../../model/actions/flow';
import { LoadPreviousChapter } from '../../model/events';
import { LayoutTypes } from '../../model/viewerSettings';

const navigateToPreviousChapter: ActionDispatcher<NavigateToPreviousChapter> = async ({
  state,
  action,
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
    state.config.eventHandler(event);
  }
  return {};
};

export default navigateToPreviousChapter;
