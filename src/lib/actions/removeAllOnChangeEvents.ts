import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { RemoveAllChangeEvents } from '../../model/actions/global';
import { State } from '../../model/state';

import { removeAllChangeEvents } from '../state/stateChangeEvents';

/**
 * Removes all event listener stop notifying events
 * typically when the user interface is unmounted.
 * This method must only be used by the API, and not by the viewer
 * @param state.action RemoveOnChangeEven action
 * @returns
 */
const removeAllOnChangeEvents: ActionDispatcher<RemoveAllChangeEvents> = async (): Promise<
  Partial<State>
  // eslint-disable-next-line @typescript-eslint/require-await
> => {
  removeAllChangeEvents();
  return {};
};

export default removeAllOnChangeEvents;
