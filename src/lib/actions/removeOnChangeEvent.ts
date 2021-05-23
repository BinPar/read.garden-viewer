import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { RemoveOnChangeEvent } from '../../model/actions/global';
import { State } from '../../model/state';
import { removeOnChangeEventListener } from '../state/stateChangeEvents';

/**
 * Removes event that fires when the viewer state changes
 * @param state.action RemoveOnChangeEven action
 * @returns 
 */
const removeOnChangeEvent: ActionDispatcher<RemoveOnChangeEvent<any>> = async ({action}): Promise<Partial<State>> => {
  removeOnChangeEventListener(action.propertyName, action.event);
  return {};
};

export default removeOnChangeEvent;
