import { ActionDispatcher, LayoutTypes, MoveNext } from '../../model';
import { updateState } from '../state';
import navigateToNextChapter from './navigateToNextChapter';

const moveNext: ActionDispatcher<MoveNext> = async ({ state }) => {
  const { scrollLeft, scrollTop } = state;
  if (state.layout === LayoutTypes.Flow) {
    const { lastPosition, totalColumnWidth, columnsInViewport, slugByPosition } = state;
    const movementWidth = totalColumnWidth * columnsInViewport;
    const rawPosition =
      ((state.scrollMode === 'horizontal' ? scrollLeft : scrollTop) * -1) / state.scale;
    const position = Math.round(rawPosition / movementWidth) * movementWidth;
    if (state.scrollMode === 'horizontal') {
      const desiredPosition = position + movementWidth;
      if (desiredPosition > lastPosition) {
        return navigateToNextChapter({
          action: {
            type: 'navigateToNextChapter',
          },
          state,
        });
      }
      if (slugByPosition.has(desiredPosition)) {
        updateState({
          forceScroll: desiredPosition,
        });
      }
    }
  }
  return {};
};

export default moveNext;
