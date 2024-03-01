import { LoadNewContent } from '../model/events';
import { LayoutTypes } from '../model/viewerSettings';

import { getState, updateState } from '../lib/state';

const navigateToContentSlug = (contentSlug: string, state = getState()): void => {
  if (state.layout === LayoutTypes.Fixed) {
    updateState({ contentSlug });
  } else if (state.scrollMode === 'horizontal' || state.scrollMode === 'vertical') {
    const { positionBySlug } = state;
    const position = positionBySlug.get(contentSlug);
    if (position) {
      updateState({ contentSlug });
    } else if (state.config.eventHandler) {
      const event: LoadNewContent = {
        type: 'loadNewContent',
        slug: state.slug,
        productSlug: state.productSlug,
        contentSlug,
      };
      /**
       * Es posible que durante la integración tengamos que cambiar o añadir información a estos
       * eventos. Como hemos avisado ya en otros puntos del código, no es lo mismo `contentSlug`
       * que `label`, por lo que es probable que se necesiten cambios.
       */
      state.config.eventHandler(event).catch((ex) => {
        const { stack, message } = ex as Error;
        console.error('Error at event handler', stack || message);
      });
    }
  }
};

export default navigateToContentSlug;
