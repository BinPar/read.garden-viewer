import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetFitMode } from '../../model/actions/fixed';

const setFitMode: ActionDispatcher<SetFitMode> = async ({ action: { fitMode } }) => ({ fitMode });

export default setFitMode;
