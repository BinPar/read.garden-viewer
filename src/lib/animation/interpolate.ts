/* eslint-disable no-param-reassign */
import { State } from "../../model/state";
import { InterpolationValue } from "./interpolationValues";

const interpolate = (state: State, value: InterpolationValue): boolean => {
  if (value.target === value.current  && Math.abs(value.speed) < 1) {
    return false;
  }
  const delta = value.target - value.current;
  if (Math.abs(delta) < value.limit && Math.abs(value.speed) < 1) {
    value.current = value.target;
    value.speed = 0;
    return false;
  }
  value.speed += delta / (state.animationSpeed / value.ratio);
  value.current += value.speed;
  value.speed *= 1 - state.animationFriction * (value.ratio / 10);
  return true;
};

export default interpolate;