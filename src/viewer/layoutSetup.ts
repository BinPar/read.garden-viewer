import { GetContentsInfo } from '../model/events';
import { State } from '../model/state';
import { LayoutTypes } from '../model/viewerSettings';

import { updateState } from '../lib/state';

/**
 * Layout setup. Every needed setup or specific initialization should happen hear for every
 * layout type. This method is not intended to return a partial state, every action should
 * be dealt with events
 * @param state Viewer state
 */
const layoutSetup = (state: State): void => {
  const { contentPlaceholderNode } = state;
  if (contentPlaceholderNode) {
    contentPlaceholderNode.innerHTML = '';
  }
  if (state.layout === LayoutTypes.Fixed) {
    updateState({ wrapperReady: false });
    const event: GetContentsInfo = {
      type: 'getContentsInfo',
      slug: state.slug,
    };
    if (state.config.eventHandler) {
      state.config.eventHandler(event);
    }
  } else {
    updateState({ wrapperReady: true });
  }
};

export default layoutSetup;
