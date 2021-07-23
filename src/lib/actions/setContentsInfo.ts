import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetContentsInfo } from '../../model/actions/fixed';
import { FixedViewerContentInfo, State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

import setCSSProperty from '../../utils/setCSSProperty';

/**
 * Sets contents info and setups needed DOM elements
 * @param context.state Viewer state
 * @param context.action Viewer action 
 * @returns Partial state update
 */
const setContentsInfo: ActionDispatcher<SetContentsInfo> = async ({ state, action }) => {
  if (state.layout === LayoutTypes.Flow) {
    throw new Error('Action not allowed in flow mode');
  }
  const { contentPlaceholderNode } = state as Required<State>;

  const { info } = action;
  let totalWidth = 0;
  let totalHeight = 0;
  let maxWidth = 0;
  let maxHeight = 0;
  let lastPosition = 0;
  let prev: string | undefined;
  let previousContent: FixedViewerContentInfo | undefined;
  const contentsBySlug = new Map<string, FixedViewerContentInfo>();
  const contentsByOrder = new Map<number, FixedViewerContentInfo>();
  const positionBySlug = new Map<string, number>();
  const slugByPosition = new Map<number, string>();
  const contentsInfo = new Array<FixedViewerContentInfo>();
  const containers = [];
  const unaffected = new Set<string>(state.config.themeUnaffectedSlugs || []);
  for (let i = 0, l = info.length; i < l; i++) {
    const { width, height, label, slug, order, html, cssURL } = info[i];
    const left = Math.max(totalWidth - 1, 0);
    const top = Math.max(totalHeight - 1, 0);
    totalHeight += height - 1;
    totalWidth += width;
    maxWidth = Math.max(maxWidth, width);
    maxHeight = Math.max(maxHeight, height);
    const container = document.createElement('div');
    container.classList.add('rg-fixed-content-container');
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
    container.dataset.order = `${order}`;
    container.dataset.slug = slug;
    container.dataset.label = label;
    container.style.setProperty('--page-top', `${top}px`);
    container.style.setProperty('--page-left', `${left}px`);
    if (unaffected.has(slug)) {
      container.classList.add('rg-avoid-invert');
    }
    containers.push(container);
    const position = state.scrollMode === 'horizontal' ? left : top;
    positionBySlug.set(slug, position);
    slugByPosition.set(position, slug);
    const contentInfo: FixedViewerContentInfo = {
      width,
      height,
      label,
      slug,
      order,
      container,
      html,
      cssURL,
      left,
      top,
      maxLeft: totalWidth,
      maxTop: totalHeight,
      prev,
    };
    contentsByOrder.set(order, contentInfo);
    contentsBySlug.set(slug, contentInfo);
    contentsInfo.push(contentInfo);
    lastPosition = position;
    prev = slug;
    if (previousContent) {
      previousContent.next = slug;
    }
    previousContent = contentInfo;
  }

  if (previousContent) {
    previousContent.next = prev;
  }

  setCSSProperty('total-width', `${totalWidth}px`);
  setCSSProperty('total-height', `${totalHeight}px`);
  contentPlaceholderNode.append(...containers);

  return new Promise<Partial<State>>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        for (let i = 0, l = info.length; i < l; i++) {
          const content = contentsByOrder.get(i);
          if (content && content.slug !== state.contentSlug) {
            contentPlaceholderNode.removeChild(content.container);
          }
        }
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            setCSSProperty('viewer-margin-top', '0');
            resolve({
              layout: LayoutTypes.Fixed,
              totalHeight,
              totalWidth,
              maxWidth,
              maxHeight,
              contentsInfo,
              contentsBySlug,
              contentsByOrder,
              positionBySlug,
              slugByPosition,
              lastPosition,
              wrapperReady: true,
            });
          });
        });
      });
    });
  });

  // return {
  //   layout: LayoutTypes.Fixed,
  //   totalHeight,
  //   totalWidth,
  //   maxWidth,
  //   maxHeight,
  //   contentsInfo,
  //   contentsBySlug,
  //   contentsByOrder,
  //   positionBySlug,
  //   slugByPosition,
  //   lastPosition,
  //   wrapperReady: true,
  // };
};

export default setContentsInfo;
