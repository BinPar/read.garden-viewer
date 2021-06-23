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
    const left = zoomPanelCoordinates.x - 2.5;
    const width = zoomPanelEndCoordinates.x - zoomPanelCoordinates.x + 5;
    let top = zoomPanelCoordinates.y;
    let height = zoomPanelEndCoordinates.y - zoomPanelCoordinates.y;
    const heightMargin = Math.min(Math.round(height * 0.35), 8);
    const topMargin = Math.round(heightMargin / 2);
    top -= topMargin;
    height += heightMargin;
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
