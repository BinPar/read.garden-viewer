import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';
import { updateState } from '../state';
import calculatePagePosition from './calculatePagePossition';

const recalculateCurrentPage = (
  state: State,
  currentScroll: number,
): void => {
  const scrollPosition = Math.round(currentScroll * -1);
  let target: string | undefined;
  if (state.scrollMode !== 'fixed') {
    if (state.scrollMode === 'horizontal') {
      if (state.layout === LayoutTypes.Flow) {
        target = state.slugByPosition.get(scrollPosition);
      } else {
        const targetScroll = calculatePagePosition(scrollPosition, state);        
        state.slugByPosition.forEach((value, key): void => {          
          if (key <= targetScroll) {
            target = value;
          }
        });
      }
    } else {
      state.slugByPosition.forEach((value, key): void => {
        if (key <= scrollPosition) {
          target = value;
        }
      });
    }
  }
  if (target !== undefined) {
    updateState({ contentSlug: target });
  }
};

export default recalculateCurrentPage;
