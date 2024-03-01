import { getState } from '../lib/state';

const getFixedScrollContentsHeight = (state = getState()): number => {
  if (state.contentPlaceholderNode) {
    return Array.from(state.contentPlaceholderNode.children).reduce(
      (t, child) => Math.max(child.clientHeight, t),
      0,
    );
  }
  return 0;
};

export default getFixedScrollContentsHeight;
