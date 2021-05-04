import { State } from '../../model/state';

import defaultConfig from '../../config/default';

const defaultState: State = {
  fitMode: defaultConfig.initialFitMode,
  currentScale: defaultConfig.initialScale || 1,
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...(defaultConfig.margin || {}),
  },
};

export default defaultState;
