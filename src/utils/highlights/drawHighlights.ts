import setCSSProperty from '../setCSSProperty';
import clientToContentWrapperCoordinates from './clientToContentWrapperCoordinates';
import deduplicateRects from './deduplicateRects';
import removeLayerHighlights from './removeLayerHighlights';

/**
 * Transforms provided selection ranges into coordinates to render highlights inside provided
 * container
 * @param container DOM Element that will contain highlights
 * @param ranges Selection ranges that will be turned into highlights
 * @param keepExisting Keep existing highlights in container
 */
const drawHighlights = (
  container: HTMLDivElement,
  ranges: Range[],
  keepExisting = false,
  key?: string,
): HTMLDivElement[] => {
  setCSSProperty('user-select', 'text');
  let resultRects = new Array<DOMRect>();

  ranges.forEach((selectionRange): void => {
    const rects = selectionRange.getClientRects();
    resultRects = resultRects.concat(deduplicateRects(rects));
  });

  if (!keepExisting) {
    removeLayerHighlights(container);
  }

  const highlights = new Array<HTMLDivElement>();
  for (let i = 0; i < resultRects.length; i++) {
    const rect = resultRects[i];
    const highlight = document.createElement('div');
    highlight.classList.add('rg-highlight');
    const zoomPanelCoordinates = clientToContentWrapperCoordinates({
      x: rect.left,
      y: rect.top,
    });
    const zoomPanelEndCoordinates = clientToContentWrapperCoordinates({
      x: rect.right,
      y: rect.bottom,
    });
    let left = zoomPanelCoordinates.x;
    let width = zoomPanelEndCoordinates.x - zoomPanelCoordinates.x;
    let top = zoomPanelCoordinates.y;
    let height = zoomPanelEndCoordinates.y - zoomPanelCoordinates.y;
    const heightGrowth = (height + 8) / height;
    if (heightGrowth <= 1.5) {
      left -= 3;
      width += 6;
      top -= 4;
      height += 8;
    } else {
      left -= 1;
      width += 2;
      top -= 1;
      height += 2;
    }
    highlight.style.left = `${left}px`;
    highlight.style.width = `${width}px`;
    highlight.style.top = `${top}px`;
    highlight.style.height = `${height}px`;
    if (key) {
      highlight.dataset.key = key;
    }
    container.append(highlight);
    highlights.push(highlight);
  }
  return highlights;
};

export default drawHighlights;
