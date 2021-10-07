import log from 'loglevel';

import { LoadNewContent } from '../model/events';
import { LayoutTypes } from '../model/viewerSettings';

import { getState, updateState } from '../lib/state';

const navigateToContentSlug = (contentSlug: string, state = getState()) => {
  if (state.scrollMode === 'horizontal' || state.scrollMode === 'vertical') {
    const { positionBySlug } = state;
    const position = positionBySlug.get(contentSlug);
    if (state.layout === LayoutTypes.Fixed) {
      updateState({ contentSlug });
    }
    if (state.layout === LayoutTypes.Flow) {
      if (position) {
        updateState({ contentSlug });
      } else if (state.config.eventHandler) {
        const event: LoadNewContent = {
          type: 'loadNewContent',
          slug: state.slug,
          contentSlug,
        };
        /**
         * Es posible que durante la integración tengamos que cambiar o añadir información a estos
         * eventos. Como hemos avisado ya en otros puntos del código, no es lo mismo `contentSlug`
         * que `label`, por lo que es probable que se necesiten cambios.
         */
        state.config.eventHandler(event);
      }
    }
  }
  if (state.scrollMode === 'fixed') {
    log.warn(
      'Page navigation not implemented in fixed mode, it should be controlled by appending new content',
    );
  }
};

export default navigateToContentSlug;
