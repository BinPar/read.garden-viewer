import { GlobalState, ScrolledState } from '../../model/state';
import { updateState } from '../state';

const recalculateCurrentPage = (
  state: ScrolledState & GlobalState,
  currentScroll: number,
): void => {
  const scrollPosition = Math.round(currentScroll * -1);
  let target: string | undefined;
  if (state.scrollMode === 'horizontal') {
    target = state.labelByPosition.get(scrollPosition);
  } else {
    state.labelByPosition.forEach((value, key): void => {
      if (key <= scrollPosition) {
        target = value;
      }
    });
  }
  if (target !== undefined) {
    updateState({ contentSlug: target });
  }
};

export default recalculateCurrentPage;
