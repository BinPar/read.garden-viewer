import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetContentsInfo } from '../../model/actions/fixed';
import { LayoutTypes, State } from '../../model/state';
import setCSSProperty from '../../utils/setCSSProperty';

const setContentsInfo: ActionDispatcher<SetContentsInfo> = async ({ state, action }) => {
  if (state.layout === LayoutTypes.Flow) {
    throw new Error('Action not allowed in flow mode');
  }
  const { contentPlaceholderNode } = state as Required<State>;

  const { info } = action;
  let totalWidth = 0;
  let totalHeight = 0;
  const containerByLabel = new Map<string, HTMLDivElement>();
  for (let i = 0, l = info.length; i < l; i++) {
    const { width, height, label } = info[i];
    totalHeight += height;
    totalWidth += width;
    const container = document.createElement('div');
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    container.dataset.label = label;
    containerByLabel.set(label, container);
    contentPlaceholderNode.appendChild(container);
  }

  setCSSProperty('total-width', `${totalWidth}px`);
  setCSSProperty('total-height', `${totalHeight}px`);

  return {
    layout: LayoutTypes.Fixed,
    totalHeight,
    totalWidth,
    containerByLabel,
    wrapperReady: true,
  };
};

export default setContentsInfo;
