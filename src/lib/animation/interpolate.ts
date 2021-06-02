/* eslint-disable no-param-reassign */
import { State } from "../../model/state";
import { InterpolationValue } from "./interpolationValues";

const interpolate = (state: State, value: InterpolationValue): boolean => {  
  const delta = value.target - value.current;
  if (Math.abs(delta) < value.limit) {
    value.current = value.target;
    value.speed = 0;
    return false;
  }
  const animationTension = state.animationSpeed / 10;
  value.speed += delta / animationTension;
  value.current += value.speed;
  value.speed *= 1 - (state.animationFriction / animationTension) ;
  return true;
};

export default interpolate;