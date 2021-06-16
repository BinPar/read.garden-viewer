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
