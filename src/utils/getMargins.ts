import { State } from '../model';

const getMargins = (
  state: Pick<State, 'containerWidth' | 'config' | 'readMode'>,
): State['margin'] => {
  const config = state.readMode ? state.config.readModeMargin : state.config.uiModeMargin;
  const responsiveConfig = state.readMode
    ? state.config.responsiveReadModeMargin
    : state.config.responsiveUiModeMargin;

  if (!responsiveConfig && config) {
    return { ...config };
  }

  if (!responsiveConfig) {
    throw new Error(`Missing both normal and responsive margin config`);
  }

  const entries = responsiveConfig.slice().sort(([a], [b]) => {
    if (a < b) {
      return -1;
    }
    if (b < a) {
      return 1;
    }
    return 0;
  });

  if (!entries.length) {
    throw new Error(`Responsive margins with no entries`);
  }

  if (state.containerWidth === 0) {
    const margin = entries.at(-1)![1];
    return { ...margin };
  }

  let margin: State['margin'] | undefined;

  for (let i = 0, l = entries.length; i < l && !margin; i++) {
    const entry = entries[i];
    if (entry) {
      const [, candidateMargin] = entry;
      const from = i === 0 ? 0 : entry[0];
      const to = entries[i + 1]?.[0] || Infinity;
      if (state.containerWidth >= from && state.containerWidth < to) {
        margin = candidateMargin;
      }
    }
  }

  if (!margin) {
    throw new Error(`Couldn't find response margin`);
  }

  return { ...margin };
};

export default getMargins;
