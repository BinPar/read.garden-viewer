/* eslint-disable no-param-reassign */
import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';
import setCSSProperty from '../../utils/setCSSProperty';
import { updateState } from '../state';
import { addOnChangeEventListener } from '../state/stateChangeEvents';

interface InterpolationValue {
  current: number;
  target: number;
  speed: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const animationController = (state: State, dispatch: DispatchAPIAction): void => {
  const scale: InterpolationValue = {
    target: 1,
    current: 1,
    speed: 0,
  };

  updateState({
    animate: false,
    animating: false,
  });

  const applyCSSProps = () => {
    setCSSProperty('scale', `${scale.current}`);
  };

  const interpolate = (value: InterpolationValue): boolean => {
    const delta = value.target - value.current;
    if (Math.abs(delta) < 0.001) {
      value.current = value.target;
      value.speed = 0;
      return false;
    } 
    value.speed += delta / (state.animationSpeed / 10);
    value.speed *= (1 - state.animationFriction);
    value.current += value.speed;
    return true;
    
  };

  const interpolateToTargetValues = () => {
    if (interpolate(scale)) {
      applyCSSProps();
      // Execute the interpolation
      window.requestAnimationFrame(interpolateToTargetValues);
    } else {
      updateState({
        animating: false,
      });
    }
  };

  const onReadModeChangeEvent = () => {
    const newMargins = state.readMode
      ? state.securityMargins.readMode
      : state.securityMargins.uiMode;
    const currentWidth = document.body.clientWidth;
    const targetWidth = currentWidth - newMargins.left - newMargins.right;
    const currentHeight = document.body.clientHeight;
    const targetHeight = currentHeight - newMargins.top - newMargins.bottom;
    const widthNeededScale = targetWidth / currentWidth;
    const heightNeededScale = targetHeight / currentHeight;
    scale.target = Math.min(widthNeededScale, heightNeededScale);
    if (!state.animate) {
      scale.current = scale.target;
      applyCSSProps();
    } else if (scale.target !== scale.current && !state.animating) {
      updateState({
        animating: true,
      });
      interpolateToTargetValues();
    }
  };

  addOnChangeEventListener('readMode', onReadModeChangeEvent);
  onReadModeChangeEvent();
  updateState({
    animate: true,
    animating: false,
  });
};

export default animationController;
