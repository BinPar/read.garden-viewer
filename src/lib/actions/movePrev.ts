import { ActionDispatcher, LayoutTypes, MoveNext } from '../../model';
import { updateState } from '../state';
import navigateToPreviousChapter from './navigateToPreviousChapter';

const movePrev: ActionDispatcher<MoveNext> = async ({ state }) => {
  if (state.scrollMode !== 'fixed') {
    if (state.layout === LayoutTypes.Flow) {
      if (state.scrollMode === 'horizontal') {
        const { scrollLeft, totalColumnWidth, columnsInViewport, slugByPosition } = state;
        const movementWidth = totalColumnWidth * columnsInViewport;
        const rawPosition = (scrollLeft * -1) / state.scale;
        const position = Math.round(rawPosition / movementWidth) * movementWidth;
        if (position === 0) {
          return navigateToPreviousChapter({
            action: {
              type: 'navigateToPreviousChapter',
              goToEnd: true,
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
      if (state.scrollMode === 'vertical') {
        return navigateToPreviousChapter({
          action: {
            type: 'navigateToPreviousChapter',
          },
          state,
        });
      }
    }
    if (state.layout === LayoutTypes.Fixed) {
      const { contentSlug, contentsBySlug } = state;
      const content = contentsBySlug.get(contentSlug);
      if (content && content.prev) {
        updateState({
          contentSlug: content.prev,
        });
      }
    }
  }
  return {};
};

export default movePrev;
