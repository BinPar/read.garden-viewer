import { updateState } from '../lib/state';
import { State } from '../model/state';
import setCSSProperty from './setCSSProperty';

const createBasicDOMElements = (state: State): void => {
  const readGardenViewer = document.createElement('div');
  setCSSProperty('debug-viewer-safe-area', `${state.debugViewerSafeArea ? 1 : 0}`);
  readGardenViewer.id = 'read-garden-viewer';
  document.body.appendChild(readGardenViewer);
  updateState({ basicDOMElementsCreated: true });
};

export default createBasicDOMElements;
