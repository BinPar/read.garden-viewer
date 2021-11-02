import { Coordinates } from '../model';

/**
 * Gets touches coordinates from touch event
 * @param ev Touch event
 */
const getTouches = (ev: TouchEvent): Coordinates[] => Array.from(ev.touches).map((touch) => ({
  x: touch.pageX,
  y: touch.pageY,
}));

export default getTouches;
