/* eslint-disable no-param-reassign */
import { DispatchAPIAction } from '../../model/apiInterface';
import { LayoutTypes, State } from '../../model/state';
import setCSSProperty from '../../utils/setCSSProperty';
import { updateState } from '../state';
import { addOnChangeEventListener } from '../state/stateChangeEvents';

interface InterpolationValue {
  current: number;
  target: number;
  speed: number;
  ratio: number;
  limit: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const animationController = (state: State, dispatch: DispatchAPIAction): void => {
  const scale: InterpolationValue = {
    target: 1,
    current: 1,
    speed: 0,
    ratio: 10,
    limit: 0.01,
  };
  const left: InterpolationValue = {
    target: 0,
    current: 0,
    speed: 0,
    ratio: 20,
    limit: 1,
  };
  const top: InterpolationValue = {
    target: 0,
    current: 0,
    speed: 0,
    ratio: 20,
    limit: 1,
  };
  const interpolationValues = [scale, left, top];

  updateState({
    animate: false,
    animating: false,
  });

  const applyCSSProps = () => {
    setCSSProperty('scale', `${Math.abs(scale.current)}`);
    setCSSProperty('horizontal-translate', `${left.current}px`);
    setCSSProperty('vertical-translate', `${top.current}px`);
  };

  const interpolate = (value: InterpolationValue): boolean => {
    if (value.target === value.current) {
      return false;
    }
    const delta = value.target - value.current;
    if (Math.abs(delta) < value.limit) {
      value.current = value.target;
      value.speed = 0;
      return false;
    }
    value.speed += delta / (state.animationSpeed / value.ratio);
    value.current += value.speed;
    value.speed *= 1 - state.animationFriction * (value.ratio / 10);
    return true;
  };

  const interpolateToTargetValues = () => {
    if (interpolationValues.filter((value) => interpolate(value)).length > 0) {
      applyCSSProps();
      // Execute the interpolation
      window.requestAnimationFrame(interpolateToTargetValues);
    } else {
      applyCSSProps();
      updateState({
        animating: false,
      });
    }
  };

  const onReadModeChangeEvent = () => {
    const newMargins = state.readMode
      ? { ...state.securityMargins.readMode }
      : { ...state.securityMargins.uiMode };
    if (!state.readMode && state.layout === LayoutTypes.Flow) {
      newMargins.bottom += state.fontSize * 3;
    }
    const currentWidth = state.containerWidth;
    const targetWidth = currentWidth - newMargins.left - newMargins.right;
    const currentHeight = state.containerHeight;
    const widthNeededScale = targetWidth / currentWidth;
    const targetHeight = currentHeight - newMargins.top - newMargins.bottom;
    const heightNeededScale = targetHeight / currentHeight;
    scale.target = Math.max(Math.min(widthNeededScale, heightNeededScale), 0);
    const marginWidth = (currentWidth - newMargins.left) * (1 - scale.target);
    left.target = newMargins.left - marginWidth / 2;
    const marginHeight = (currentHeight - newMargins.top) * (1 - scale.target);
    top.target = newMargins.top - marginHeight / 2;

    if (!state.animate) {
      interpolationValues.forEach((value) => {
        value.current = value.target;
      });
      applyCSSProps();
    } else if (
      interpolationValues.find((value) => value.target !== value.current) &&
      !state.animating
    ) {
      updateState({
        animating: true,
      });
      interpolateToTargetValues();
    }
  };

  addOnChangeEventListener('readMode', onReadModeChangeEvent);
  addOnChangeEventListener('containerWidth', onReadModeChangeEvent);
  addOnChangeEventListener('containerHeight', onReadModeChangeEvent);
  addOnChangeEventListener('fontSize', onReadModeChangeEvent);
  onReadModeChangeEvent();
  updateState({
    animate: true,
    animating: false,
  });
};

export default animationController;
