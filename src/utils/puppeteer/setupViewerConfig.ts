import { InitialConfig, State } from '../../model';

/**
 * Setups Read Garden Viewer Config in the browser
 * @param viewerInitialConfig initial config to apply serialized as string
 * @returns current State
 */
const setupViewerConfig = (viewerInitialConfig: string): State => {
  const config = JSON.parse(viewerInitialConfig) as InitialConfig;
  config.eventHandler = window.readGardenEventHandler;
  window.readGardenApi = window.readGardenViewer(config);
  window.readGardenSetDispatcher(window.readGardenApi.dispatch);
  window.readGardenSetState(window.readGardenApi.state);
  return window.readGardenApi.state;
};

export default setupViewerConfig;
