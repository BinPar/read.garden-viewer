import { ActionDispatcher, LayoutTypes, MoveNext } from '../../model';
import { updateState } from '../state';
import navigateToPreviousChapter from './navigateToPreviousChapter';

const movePrev: ActionDispatcher<MoveNext> = async ({ state }) => {
  const { scrollLeft, scrollTop } = state;
  if (state.layout === LayoutTypes.Flow) {
    const position = (state.scrollMode === 'horizontal' ? scrollLeft : scrollTop) * -1;
    if (position === 0) {
      return navigateToPreviousChapter({
        action: {
          type: 'navigateToPreviousChapter',
        },
        state,
      });
    }
    if (state.scrollMode === 'horizontal') {
      const { totalColumnWidth, columnsInViewport, slugByPosition } = state;
      const desiredPosition = position - totalColumnWidth * columnsInViewport;
      const newContentSlug = slugByPosition.get(desiredPosition);
      if (newContentSlug) {
        updateState({
          contentSlug: newContentSlug,
        });
      }
    }
  }
  return {};
};

export default movePrev;
