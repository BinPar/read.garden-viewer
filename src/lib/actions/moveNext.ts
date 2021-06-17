import { ActionDispatcher, LayoutTypes, MoveNext } from '../../model';
import { updateState } from '../state';
import navigateToNextChapter from './navigateToNextChapter';

const moveNext: ActionDispatcher<MoveNext> = async ({ state }) => {
  const { scrollLeft, scrollTop } = state;
  if (state.layout === LayoutTypes.Flow) {
    const { lastPosition, totalColumnWidth, columnsInViewport, slugByPosition } = state;
    const position = (state.scrollMode === 'horizontal' ? scrollLeft : scrollTop) * -1;
    if (position === lastPosition) {
      return navigateToNextChapter({
        action: {
          type: 'navigateToNextChapter',
        },
        state,
      });
    }
    const desiredPosition = position + totalColumnWidth * columnsInViewport;
    const newContentSlug = slugByPosition.get(desiredPosition);
    if (newContentSlug) {
      updateState({
        contentSlug: newContentSlug,
      });
    }
  }
  return {};
};

export default moveNext;
