/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';
import setCSSProperty from '../../utils/setCSSProperty';
import { updateState } from '../state';
import { InterpolationValue } from './interpolationValues';

const scrollController = (
  state: State,
  dispatch: DispatchAPIAction,
  scroll: InterpolationValue,
  executeTransitions: () => void,
): void => {
  let mouseDown = false;
  let lastDelta = 0;

  const onDragStart = (ev: MouseEvent): void => {
    mouseDown = true;
  };

  const onDragEnd = (ev: MouseEvent): void => {
    mouseDown = false;
    setTimeout(() => {
      updateState({
        dragging: false,
      });
      setCSSProperty('user-select', 'auto');
    }, 0);
  };

  const onDragMove = (ev: MouseEvent): void => {
    if (mouseDown) {
      if (!state.dragging) {
        updateState({
          dragging: true,
        });
        setCSSProperty('user-select', 'none');
      }
      scroll.forceUpdate = true;
      if (state.scrollMode === 'horizontal') {
        lastDelta = ev.movementX;        
      }
      if (state.scrollMode === 'vertical') {
        lastDelta = ev.movementY;
      }
      scroll.current += lastDelta;
      scroll.target = scroll.current;
      executeTransitions();
      scroll.forceUpdate = false;      
    }
  };

  window.addEventListener('mousedown', onDragStart);
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('mousemove', onDragMove);
};

export default scrollController;
