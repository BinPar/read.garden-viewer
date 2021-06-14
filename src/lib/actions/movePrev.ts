import { ActionDispatcher, LayoutTypes, MoveNext } from '../../model';
import { updateState } from '../state';
import navigateToPreviousChapter from './navigateToPreviousChapter';

const movePrev: ActionDispatcher<MoveNext> = async ({ state }) => {
  if (state.scrollMode !== 'fixed') {
    const { contentSlug, positionBySlug, slugByPosition } = state;
    const position = positionBySlug.get(contentSlug);
    if (position !== undefined) {
      if (state.layout === LayoutTypes.Flow) {
        if (position === 0) {
          return navigateToPreviousChapter({
            action: {
              type: 'navigateToPreviousChapter',
            },
            state,
          });
        }
        const { totalColumnWidth, columnsInViewport } = state;
        const desiredPosition = position - totalColumnWidth * columnsInViewport;
        const newContentSlug = slugByPosition.get(desiredPosition);
        if (newContentSlug) {
          updateState({
            contentSlug: newContentSlug,
          });
        }
      }
    }
  }
  return {};
};

export default movePrev;
