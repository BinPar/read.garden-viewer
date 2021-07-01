import { getState } from '../lib/state';
import { LayoutTypes } from '../model';

const cleanStyles = (state = getState()): void => {
  try {
    const { dynamicStyleNode } = state;
    if (dynamicStyleNode) {
      dynamicStyleNode.remove();
    }
    if (state.layout === LayoutTypes.Fixed) {
      state.fixedStylesNodes.forEach((node) => {
        node.remove();
      });
    }
  } catch {
    // No need
  }
};

export default cleanStyles;