import { ActionDispatcher, LayoutTypes, MoveNext } from '../../model';
import { updateState } from '../state';
import navigateToPreviousChapter from './navigateToPreviousChapter';

const movePrev: ActionDispatcher<MoveNext> = async ({ state }) => {
  const { scrollLeft, scrollTop } = state;
  if (state.layout === LayoutTypes.Flow) {
    const { totalColumnWidth, columnsInViewport, slugByPosition } = state;
    const movementWidth = totalColumnWidth * columnsInViewport;
    const rawPosition =
      ((state.scrollMode === 'horizontal' ? scrollLeft : scrollTop) * -1) / state.scale;
    const position = Math.round(rawPosition / movementWidth) * movementWidth;
    if (state.scrollMode === 'horizontal') {
      if (position === 0) {
        return navigateToPreviousChapter({
          action: {
            type: 'navigateToPreviousChapter',
          },
          state,
        });
      }
      const desiredPosition = position - movementWidth;
      if (slugByPosition.has(desiredPosition)) {
        updateState({
          forceScroll: desiredPosition,
        });
      }
    }
  }
  return {};
};

export default movePrev;
