import { updateState } from '../lib/state';
import { State } from '../model/state';
import setCSSProperty from './setCSSProperty';

const createBasicDOMElements = (state: State): void => {
  const readGardenViewerNode = document.createElement('div');
  setCSSProperty(
    'debug-viewer-safe-area',
    `${state.debugViewerSafeArea ? 1 : 0}`,
  );
  readGardenViewerNode.id = 'read-garden-viewer';
  document.body.appendChild(readGardenViewerNode);
  updateState({ basicDOMElementsCreated: true, readGardenViewerNode });
};

export default createBasicDOMElements;
