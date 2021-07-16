import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetZoom } from '../../model/actions/fixed';
import { LayoutTypes } from '../../model/viewerSettings';

const setZoom: ActionDispatcher<SetZoom> = async ({ action, state }) => {
  if (state.layout === LayoutTypes.Flow) {
    throw new Error('Action not allowed in flow mode');
  }
  return { zoom: action.zoom, fitMode: undefined };
};

export default setZoom;
