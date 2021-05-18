import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetContentsInfo } from '../../model/actions/fixed';
import { FixedViewerContentInfo, LayoutTypes, State } from '../../model/state';
import setCSSProperty from '../../utils/setCSSProperty';

const setContentsInfo: ActionDispatcher<SetContentsInfo> = async ({ state, action }) => {
  if (state.layout === LayoutTypes.Flow) {
    throw new Error('Action not allowed in flow mode');
  }
  const { contentPlaceholderNode } = state as Required<State>;

  const { info } = action;
  let currentContentIndex = 0;
  let totalWidth = 0;
  let totalHeight = 0;
  const contentsByLabel = new Map<string, FixedViewerContentInfo>();
  const contentsByOrder = new Map<number, FixedViewerContentInfo>();
  for (let i = 0, l = info.length; i < l; i++) {
    const { width, height, label, slug, order, html, cssURL } = info[i];
    totalHeight += height;
    totalWidth += width;
    const container = document.createElement('div');
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    container.dataset.label = label;
    container.dataset.slug = slug;
    contentPlaceholderNode.appendChild(container);
    if (!currentContentIndex && slug === state.contentSlug) {
      currentContentIndex = order;
    }
    const contentInfo: FixedViewerContentInfo = {
      width,
      height,
      label,
      slug,
      order,
      container,
      html,
      cssURL,
    };
    contentsByOrder.set(order, contentInfo);
    contentsByLabel.set(label, contentInfo);
  }

  setCSSProperty('total-width', `${totalWidth}px`);
  setCSSProperty('total-height', `${totalHeight}px`);

  return {
    layout: LayoutTypes.Fixed,
    totalHeight,
    totalWidth,
    contentsByLabel,
    contentsByOrder,
    currentContentIndex,
    wrapperReady: true,
  };
};

export default setContentsInfo;
