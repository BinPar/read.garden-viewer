import { ActionDispatcher, LayoutTypes, MoveNext } from '../../model';

import { updateState } from '../state';
import navigateToNextChapter from './navigateToNextChapter';

const moveNext: ActionDispatcher<MoveNext> = async ({ state }) => {
  if (state.layout === LayoutTypes.Flow) {
    if (state.scrollMode === 'horizontal') {
      const { scrollLeft, lastPosition, totalColumnWidth, columnsInViewport, slugByPosition } =
        state;
      const movementWidth = totalColumnWidth * columnsInViewport;
      const rawPosition = (scrollLeft * -1) / state.scale;
      const position = Math.round(rawPosition / movementWidth) * movementWidth;
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
          animateToScroll: desiredPosition,
        });
      }
    }

    if (state.scrollMode === 'vertical') {
      return navigateToNextChapter({
        action: {
          type: 'navigateToNextChapter',
        },
        state,
      });
    }
  }

  if (state.layout === LayoutTypes.Fixed) {
    const { contentSlug, contentsBySlug } = state;
    const content = contentsBySlug.get(contentSlug);
    if (content?.next) {
      if (state.scrollMode === 'fixed' && state.doublePage && !content.rightSide) {
        const next = contentsBySlug.get(content.next);
        if (next?.next) {
          updateState({
            contentSlug: next.next,
          });
        }
      } else {
        updateState({
          contentSlug: content.next,
        });
      }
    }
  }

  return {};
};

export default moveNext;
