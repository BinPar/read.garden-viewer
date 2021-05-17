import { getState } from '../../lib/state';
import { Coordinates } from '../../model/highlights';
import { getScrollLeftPosition, getScrollTopPosition } from './getScrollPosition';

export const clientToContentWrapperLeft = (left: number): number => {
  const state = getState();
  let result = left;
  result += getScrollLeftPosition();
  result -= (window.innerWidth * (1 - state.scale)) / 2;
  result /= state.scale;
  return result;
};

export const clientToContentWrapperTop = (top: number): number => {
  const state = getState();
  let result = top;
  result += getScrollTopPosition();
  result -= (window.innerHeight * (1 - state.scale)) / 2;
  result /= state.scale;
  return result;
};

/**
 * Translates client coordinates to main node coordinates
 * recalculating the zoom and scroll deformations
 * @param {Coordinates} client Client coordinates
 * @returns Zoom Panel coordinates
 */
const clientToContentWrapperCoordinates = (client: Coordinates): Coordinates => ({
  ...client,
  x: clientToContentWrapperLeft(client.x),
  y: clientToContentWrapperTop(client.y),
});

export default clientToContentWrapperCoordinates;
