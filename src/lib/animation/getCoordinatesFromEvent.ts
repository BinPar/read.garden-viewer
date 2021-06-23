export interface Coordinates {
  x: number;
  y: number;
}

const getCoordinatesFromEvent = (ev: MouseEvent | TouchEvent): Coordinates => {
  if ((ev as MouseEvent).movementX !== undefined) {
    return {
      x: (ev as MouseEvent).clientX,
      y: (ev as MouseEvent).clientY,
    };
  } 
  const touch = (ev as TouchEvent).touches?.length ? (ev as TouchEvent).touches[0] : (ev as TouchEvent).changedTouches[0];
  return {
    x: touch.clientX,
    y: touch.clientY,
  };
}

export default getCoordinatesFromEvent;