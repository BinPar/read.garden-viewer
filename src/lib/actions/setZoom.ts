import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetZoom } from '../../model/actions/fixed';

const setZoom: ActionDispatcher<SetZoom> = async ({ action: { zoom } }) => ({ zoom });

export default setZoom;
