import { getState } from '../../lib/state';
import { Coordinates } from '../../model/highlights';
import getScrollLeftPosition from './getScrollLeftPosition';
import getScrollTopPosition from './getScrollTopPosition';

/**
 * Translates client left coordinate to main node left coordinate
 * @param left Left coordinate
 * @returns Zoom panel left coordinate
 */
export const clientToContentWrapperLeft = (left: number): number => {
  const state = getState();
  let result = left;
  result += getScrollLeftPosition(state);
  result -= (document.body.clientWidth * (1 - state.scale)) / 2;
  result /= state.scale;
  return result;
};

/**
 * Translates client top coordinate to main node top coordinate
 * @param top Top coordinate
 * @returns Zoom panel top coordinate
 */
export const clientToContentWrapperTop = (top: number): number => {
  const state = getState();
  let result = top;
  result += getScrollTopPosition(state);
  result -= (document.body.clientHeight * (1 - state.scale)) / 2;
  result /= state.scale;
  return result;
};

/**
 * Translates client coordinates to main node coordinates
 * recalculating the zoom and scroll deformations
 * @param {Coordinates} client Client coordinates
 * @returns Zoom Panel coordinates
 */
const clientToContentWrapperCoordinates = (client: Coordinates): Coordinates => {
  const state = getState();
  return {
    zoomFix: 1 / state.scale,
    x: clientToContentWrapperLeft(client.x),
    y: clientToContentWrapperTop(client.y),
  };
};

export default clientToContentWrapperCoordinates;
