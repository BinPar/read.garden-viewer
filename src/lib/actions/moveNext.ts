import { ActionDispatcher, LayoutTypes, MoveNext } from '../../model';
import { updateState } from '../state';
import navigateToNextChapter from './navigateToNextChapter';

const moveNext: ActionDispatcher<MoveNext> = async ({ state }) => {
  if (state.scrollMode !== 'fixed') {
    const { contentSlug, positionBySlug, slugByPosition, lastPosition } = state;
    const position = positionBySlug.get(contentSlug);
    if (position !== undefined) {
      if (state.layout === LayoutTypes.Flow) {
        const { totalColumnWidth, columnsInViewport } = state;
        const desiredPosition = position + totalColumnWidth * columnsInViewport;
        if (desiredPosition <= lastPosition) {
          const newContentSlug = slugByPosition.get(desiredPosition);
          if (newContentSlug) {
            updateState({
              contentSlug: newContentSlug,
            });
          }
        } else {
          return navigateToNextChapter({
            action: {
              type: 'navigateToNextChapter',
            },
            state,
          });
        }
      }
    }
  }
  return {};
};

export default moveNext;
