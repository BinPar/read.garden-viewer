import { FixedContentInfo, FixedState, FixedViewerContentInfo, State } from '../model/state';
import { GapMode, LayoutTypes } from '../model/viewerSettings';

import { getState } from '../lib/state';
import setCSSProperty from './setCSSProperty';
import type { LoadNewContent } from '../model/events';

const getContainer = (
  info: FixedContentInfo,
  previousInfo?: FixedViewerContentInfo,
): HTMLDivElement => {
  if (previousInfo?.container) {
    return previousInfo.container;
  }

  const { order, width, height, slug, label } = info;
  const container = document.createElement('div');
  container.classList.add('rg-fixed-content-container');
  // container.style.width = `${width}px`;
  // container.style.height = `${height - 1}px`;
  container.dataset.order = `${order}`;
  container.dataset.slug = slug;
  container.dataset.label = label;
  container.style.setProperty('--page-width', `${width}px`);
  container.style.setProperty('--page-height', `${height - 1}px`);
  return container;
};

const processFixedContents = async (
  info: FixedContentInfo[],
  state = getState(),
): Promise<Partial<State>> => {
  const { contentPlaceholderNode } = state as Required<State>;
  const { gapMode, gapSize, contentsByOrder: oldContentsByOrder } = state as FixedState;

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
  const pageOne = info.find((i) => i.label === '1');
  const pairOrder = pageOne ? pageOne.order % 2 : 0;
  for (let i = 0, l = info.length; i < l; i++) {
    const content = info[i];
    const { width, height, label, slug, order, html, cssURL } = content;

    if (width && height) {
      const previousInfo = oldContentsByOrder?.get(order);
      const rightSide = order % 2 === pairOrder;
      const top = Math.max(totalHeight - 1, 0);
      const left = Math.max(totalWidth - 1, 0);
      totalHeight += height - 3;
      totalWidth += width;
      if (gapMode !== GapMode.None) {
        totalHeight += gapSize;
        if (gapMode === GapMode.All || !pageOne || order % 2 === pairOrder) {
          totalWidth += gapSize;
        }
      }
      maxWidth = Math.max(maxWidth, width);
      maxHeight = Math.max(maxHeight, height);
      const container = getContainer(content, previousInfo);
      container.style.setProperty('--page-top', `${top}px`);
      container.style.setProperty('--page-left', `${left}px`);
      if (unaffected.has(slug)) {
        container.classList.add('rg-avoid-invert');
      }
      containers.push(container);
      const position = state.scrollMode === 'horizontal' ? left : top;
      positionBySlug.set(slug, position);
      slugByPosition.set(position, slug);
      const initialContent =
        (state.config.initialContent?.contentSlug === slug && state.config.initialContent) ||
        undefined;
      const contentInfo: FixedViewerContentInfo = {
        width,
        height,
        label,
        slug,
        order,
        container,
        html: previousInfo?.html || html || initialContent?.htmlContent,
        cssURL: previousInfo?.cssURL || cssURL || initialContent?.cssURL,
        left,
        top,
        maxLeft: totalWidth,
        maxTop: totalHeight,
        prev,
        rightSide,
      };
      if (contentInfo.html) {
        container.innerHTML = contentInfo.html;
      }
      contentsByOrder.set(order, contentInfo);
      contentsBySlug.set(slug, contentInfo);
      contentsInfo.push(contentInfo);
      lastPosition = position;
      prev = slug;
      if (previousContent) {
        previousContent.next = slug;
      }
      previousContent = contentInfo;
    } else {
      console.warn(`Fixed content missing width or height, review conversion`, content);
    }
  }

  setCSSProperty('total-width', `${totalWidth}px`);
  setCSSProperty('total-height', `${totalHeight}px`);
  setCSSProperty('max-width', `${maxWidth}px`);
  setCSSProperty('max-height', `${maxHeight}px`);

  return new Promise<Partial<State>>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        let found = false;
        let initialContentToAsk = '';
        for (let i = 0, l = info.length; i < l && !found; i++) {
          const content = contentsByOrder.get(i);
          if (content?.container && content.slug === state.contentSlug) {
            contentPlaceholderNode.append(content.container);
            if (!content.container.innerHTML) {
              initialContentToAsk = content.slug;
              console.warn(`No HTML for initial content container`, content);
            }
            found = true;
          }
        }
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            resolve({
              fixedInfo: info,
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
            if (initialContentToAsk && state.config.eventHandler) {
              const loadNewContent: LoadNewContent = {
                type: 'loadNewContent',
                slug: state.config.slug,
                productSlug: state.productSlug,
                contentSlug: initialContentToAsk,
              };
              state.config.eventHandler(loadNewContent).catch((ex) => {
                const { stack, message } = ex as Error;
                console.error('Error at event handler', stack || message);
              });
            }
          });
        });
      });
    });
  });
};

export default processFixedContents;
