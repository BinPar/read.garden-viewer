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
const addOnChangeEvent: ActionDispatcher<AddOnChangeEvent<any>> = async ({
  action,
  state,
  // eslint-disable-next-line @typescript-eslint/require-await
}): Promise<Partial<State>> => {
  addOnChangeEventListener(action.propertyName, action.event);
  if (action.returnValue) {
    action.event(state[action.propertyName as keyof State], undefined);
  }
  return {};
};

export default addOnChangeEvent;
