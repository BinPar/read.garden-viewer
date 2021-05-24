export interface InterpolationValue {
  current: number;
  target: number;
  speed: number;
  ratio: number;
  limit: number;
  forceUpdate?: boolean;
}

export const scale: InterpolationValue = {
  target: 1,
  current: 1,
  speed: 0,
  ratio: 10,
  limit: 0.01,
};

export const left: InterpolationValue = {
  target: 0,
  current: 0,
  speed: 0,
  ratio: 20,
  limit: 1,
};

export const top: InterpolationValue = {
  target: 0,
  current: 0,
  speed: 0,
  ratio: 20,
  limit: 1,
};

export const scroll: InterpolationValue = {
  target: 0,
  current: 0,
  speed: 0,
  ratio: 20,
  limit: 1,
};
