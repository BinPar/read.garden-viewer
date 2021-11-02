import { Coordinates } from '../model';

const getTouchCenter = (touches: Coordinates[]): Coordinates => ({
  x: touches.map((touch) => touch.x).reduce((t, c) => t + c) / touches.length,
  y: touches.map((touch) => touch.y).reduce((t, c) => t + c) / touches.length,
});

export default getTouchCenter;