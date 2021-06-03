import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';
import { updateState } from '../state';
import { scale, zoom } from './interpolationValues';

const recalculateCurrentPage = (
  state: State,
  currentScroll: number,
): void => {
  const scrollPosition = Math.round(currentScroll * -1);
  let target: string | undefined;
  if (state.scrollMode !== 'fixed') {
    if (state.scrollMode === 'horizontal') {
      if (state.layout === LayoutTypes.Flow) {
        target = state.labelByPosition.get(scrollPosition);
      } else {
        const targetScale = Math.abs(scale.current * zoom.current);
        const realWidth = window.innerWidth - state.margin.left - state.margin.right;
        const targetScroll = scrollPosition + ((realWidth / 2) + state.margin.left) / targetScale;
        
        state.labelByPosition.forEach((value, key): void => {          
          if (key <= targetScroll) {
            target = value;
          }
        });
      }
    } else {
      state.labelByPosition.forEach((value, key): void => {
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
