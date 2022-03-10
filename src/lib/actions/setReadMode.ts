import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetReadMode } from '../../model/actions/global';
import { State } from '../../model/state';

/**
 * Changes de Read Mode of the viewport
 * @param context.action.readModeActive will be true for read mode and false for UI mode
 * @returns Update state
 */
// eslint-disable-next-line @typescript-eslint/require-await
const setReadMode: ActionDispatcher<SetReadMode> = async ({ action }): Promise<Partial<State>> => ({
  readMode: action.readModeActive,
});

export default setReadMode;
