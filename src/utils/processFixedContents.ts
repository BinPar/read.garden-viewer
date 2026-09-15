import { FixedContentInfo, FixedState, FixedViewerContentInfo, State } from '../model/state';
import { GapMode, LayoutTypes } from '../model/viewerSettings';

import { getState } from '../lib/state';
import setCSSProperty from './setCSSProperty';

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
  container.style.width = `${width}px`;
  container.style.height = `${height - 1}px`;
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
  const {
    gapMode,
    gapSize,
    contentsByOrder: oldContentsByOrder,
    separatorColor,
    separatorWidth,
    separatorPairWidth,
  } = state as FixedState;

  // Remove any previously drawn separators (this can run again on relayout/resize)
  contentPlaceholderNode.querySelectorAll('.rg-page-separator').forEach((el) => el.remove());

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
  const pairOrder = pageOne ? pageOne.order % 2 : undefined;
  const effectivePairOrder = pairOrder ?? 0;
  // A "leaf change" (cambio de hoja) happens every two pages: when the next page starts a new pair.
  // Its separator (filete) is thicker than the "page change" one.
  const boundarySeparatorWidth = (nextOrder: number): number =>
    nextOrder % 2 === effectivePairOrder ? separatorPairWidth : separatorWidth;
  for (let i = 0, l = info.length; i < l; i++) {
    const content = info[i];
    const { width, height, label, slug, order, html, cssURL } = content;
    const previousInfo = oldContentsByOrder?.get(order);
    const left = Math.max(totalWidth - 1, 0);
    const top = Math.max(totalHeight - 1, 0);
    totalHeight += height - 3;
    totalWidth += width;
    if (separatorColor) {
      // The gap for each boundary equals its filete width, so the filete fills it
      // completely (no empty space) with a thicker line on leaf changes (every two pages).
      if (i < l - 1) {
        const boundaryWidth = boundarySeparatorWidth(info[i + 1].order);
        if (state.scrollMode === 'horizontal') {
          totalWidth += boundaryWidth;
        } else {
          totalHeight += boundaryWidth;
        }
      }
    } else if (gapMode !== GapMode.None) {
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
    const contentInfo: FixedViewerContentInfo = {
      width,
      height,
      label,
      slug,
      order,
      container,
      html: previousInfo?.html || html,
      cssURL: previousInfo?.cssURL || cssURL,
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
  setCSSProperty('max-width', `${maxWidth}px`);
  setCSSProperty('max-height', `${maxHeight}px`);

  // Draw the page separator (filete) centered in the gap between consecutive pages
  const separators: HTMLDivElement[] = [];
  if (separatorColor) {
    for (let i = 0, l = contentsInfo.length - 1; i < l; i++) {
      const current = contentsInfo[i];
      const next = contentsInfo[i + 1];
      const width = boundarySeparatorWidth(next.order);
      const separator = document.createElement('div');
      separator.classList.add('rg-page-separator');
      separator.style.background = separatorColor;
      if (state.scrollMode === 'horizontal') {
        const centerX = (current.left + current.width + next.left) / 2;
        separator.style.left = `${centerX - width / 2}px`;
        separator.style.top = '0px';
        separator.style.width = `${width}px`;
        separator.style.height = `${maxHeight}px`;
      } else {
        const centerY = (current.top + current.height + next.top) / 2;
        separator.style.top = `${centerY - width / 2}px`;
        separator.style.left = '0px';
        separator.style.height = `${width}px`;
        separator.style.width = `${maxWidth}px`;
      }
      separators.push(separator);
    }
  }

  contentPlaceholderNode.append(...containers, ...separators);

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
            // setCSSProperty('viewer-margin-top', '0');
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
          });
        });
      });
    });
  });
};

export default processFixedContents;
