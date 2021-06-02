import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { AddOnChangeEvent } from '../../model/actions/global';
import { State } from '../../model/state';
import { addOnChangeEventListener } from '../state/stateChangeEvents';

/**
 * Adds event that fires when the viewer state changes
 * this method must only be used by the API, and not by the viewer
 * @param state.action AddOnChangeEven action
 * @returns 
 */
const addOnChangeEvent: ActionDispatcher<AddOnChangeEvent<any>> = async ({action}): Promise<Partial<State>> => {
  addOnChangeEventListener(action.propertyName, action.event);
  return {};
};

export default addOnChangeEvent;
