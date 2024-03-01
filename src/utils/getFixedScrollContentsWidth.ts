import { getState } from '../lib/state';

const getFixedScrollContentsWidth = (state = getState()): number => {
  if (state.contentPlaceholderNode) {
    return Array.from(state.contentPlaceholderNode.children).reduce(
      (t, child) => t + child.clientWidth,
      0,
    );
  }
  return 0;
};

export default getFixedScrollContentsWidth;
