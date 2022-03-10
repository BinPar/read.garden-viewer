import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { NavigateToPage } from '../../model/actions/global';

import navigateToContentSlug from '../../utils/navigateToContentSlug';

/**
 * Navigate to a specific page (by label)
 * @param context.state Viewer state
 * @param context.action Viewer action
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/require-await
const navigateToPage: ActionDispatcher<NavigateToPage> = async ({ state, action }) => {
  if (action.contentSlug !== state.contentSlug) {
    navigateToContentSlug(action.contentSlug);
  }
  return {};
};

export default navigateToPage;
