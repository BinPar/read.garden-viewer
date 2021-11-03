import { Coordinates } from '../model';

const getDistance = (a: Coordinates, b: Coordinates): number => {
  const x = a.x - b.x;
  const y = a.y - b.y;
  return Math.sqrt(x * x + y * y);
};

const calculateDistance = (startTouches: Coordinates[], endTouches: Coordinates[]): number => {
  const startDistance = getDistance(startTouches[0], startTouches[1]);
  const endDistance = getDistance(endTouches[0], endTouches[1]);
  return endDistance / startDistance;
};

export default calculateDistance;