export interface InterpolationValue {
  current: number;
  target: number;
  speed: number;
  limit: number;
  forceUpdate?: boolean;
}

export const scale: InterpolationValue = {
  target: 1,
  current: 1,
  speed: 0,
  limit: 0.001,
};

export const zoom: InterpolationValue = {
  target: 1,
  current: 1,
  speed: 0,
  limit: 0.001,
};

export const left: InterpolationValue = {
  target: 0,
  current: 0,
  speed: 0,
  limit: 2,
};

export const top: InterpolationValue = {
  target: 0,
  current: 0,
  speed: 0,
  limit: 2,
};

export const leftCorrector: InterpolationValue = {
  target: 0,
  current: 0,
  speed: 0,
  limit: 2,
};

export const topCorrector: InterpolationValue = {
  target: 0,
  current: 0,
  speed: 0,
  limit: 2,
};

export const scroll: InterpolationValue = {
  target: 0,
  current: 0,
  speed: 0,
  limit: 2,
};

export const altScroll: InterpolationValue = {
  target: 0,
  current: 0,
  speed: 0,
  limit: 2,
};

export const resetInterpolationValues = (): void => {
  scale.current = 1;
  scale.target = 1;
  scale.speed = 0;
  zoom.current = 1;
  zoom.target = 1;
  zoom.speed = 0;
  left.current = 0;
  left.target = 0;
  left.speed = 0;
  top.current = 0;
  top.target = 0;
  top.speed = 0;
  leftCorrector.current = 0;
  leftCorrector.target = 0;
  leftCorrector.speed = 0;
  topCorrector.current = 0;
  topCorrector.target = 0;
  topCorrector.speed = 0;
  scroll.current = 0;
  scroll.target = 0;
  scroll.speed = 0;
  altScroll.current = 0;
  altScroll.target = 0;
  altScroll.speed = 0;
};
