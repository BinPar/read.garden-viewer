import log from 'loglevel';
import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { NavigateToPage } from '../../model/actions/global';
import { LoadNewContent } from '../../model/events';
import { LayoutTypes } from '../../model/viewerSettings';
import { updateState } from '../state';

/**
 * Navigate to a specific page (by label)
 * @param context.state Viewer state
 * @param context.action Viewer action
 * @returns 
 */
const navigateToPage: ActionDispatcher<NavigateToPage> = async ({ state, action }) => {
  if (state.scrollMode === 'horizontal' || state.scrollMode === 'vertical') {
    const { positionByLabel } = state;
    const position = positionByLabel.get(action.pageLabel);
    if (state.layout === LayoutTypes.Fixed) {
      updateState({
        contentSlug: action.pageLabel,
      });
    }
    if (state.layout === LayoutTypes.Flow) {
      if (position) {
        updateState({
          contentSlug: action.pageLabel,
        });
      } else if (state.config.eventHandler) {
        const event: LoadNewContent = {
          type: 'loadNewContent',
          slug: state.slug,
          contentSlug: action.pageLabel.toLowerCase(),
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
  return {};
};

export default navigateToPage;
