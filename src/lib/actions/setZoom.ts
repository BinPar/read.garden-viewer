import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetZoom } from '../../model/actions/fixed';
import { LayoutTypes } from '../../model/viewerSettings';

// eslint-disable-next-line @typescript-eslint/require-await
const setZoom: ActionDispatcher<SetZoom> = async ({ action, state }) => {
  if (state.layout === LayoutTypes.Flow) {
    throw new Error('Action not allowed in flow mode');
  }

  return {
    zoom: Math.max(Math.min(action.zoom, state.config.zoom.max), state.config.zoom.min),
    fitMode: undefined,
  };
};

export default setZoom;
