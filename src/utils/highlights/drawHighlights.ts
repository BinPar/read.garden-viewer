import clientToContentWrapperCoordinates from './clientToContentWrapperCoordinates';
import deduplicateRects from './deduplicateRects';
import removeHighlights from './removeHighlights';

/**
 * Transforms provided selection ranges into coordinates to render highlights inside provided
 * container
 * @param container DOM Element that will contain highlights
 * @param ranges Selection ranges that will be turned into highlights
 * @param keepExisting Keep existing highlights in container
 */
const drawHighlights = (
  container: HTMLDivElement,
  ranges = new Array<Range>(),
  keepExisting = false,
): void => {
  let resultRects = new Array<DOMRect>();

  ranges.forEach((selectionRange): void => {
    const rects = selectionRange.getClientRects();
    resultRects = resultRects.concat(deduplicateRects(rects));
  });

  if (!keepExisting) {
    removeHighlights(container);
  }

  for (let i = 0; i < resultRects.length; i++) {
    const rect = resultRects[i];
    const highlight = document.createElement('div');
    highlight.classList.add('rg-highlight');
    const zoomPanelCoordinates = clientToContentWrapperCoordinates({
      x: rect.left,
      y: rect.top,
    });
    const fixZoom = zoomPanelCoordinates.zoomFix || 1;
    highlight.style.left = `${zoomPanelCoordinates.x - 3}px`;
    highlight.style.top = `${zoomPanelCoordinates.y - 4}px`;
    highlight.style.width = `${rect.width * fixZoom + 4}px`;
    highlight.style.height = `${rect.height * fixZoom + 5}px`;
    container.append(highlight);
  }
};

export default drawHighlights;
