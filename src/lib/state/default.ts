import { InitialState } from '../../model/state';

import defaultConfig from '../../config/default';

const defaultState: InitialState = {
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...(defaultConfig.readModeMargin || {}),
  },
  config: {
    ...defaultConfig,
  },
};

export default defaultState;
