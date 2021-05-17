import clientToZoomPanelCoordinates from './clientToZoomPanelCoordinates';
import deduplicateRects from './deduplicateRects';

const drawHighlights = (container: HTMLDivElement, ranges: Range[]): void => {
  let resultRects = new Array<DOMRect>();

  ranges.forEach((selectionRange): void => {
    const rects = selectionRange.getClientRects();
    resultRects = resultRects.concat(deduplicateRects(rects));
  });

  // Removes all the previous highlights
  container.querySelectorAll('.rg-highlight').forEach((hl): void => {
    hl.remove();
  });

  for (let i = 0; i < resultRects.length; i++) {
    const rect = resultRects[i];
    const highlight = document.createElement('div');
    highlight.classList.add('rg-highlight');
    const zoomPanelCoordinates = clientToZoomPanelCoordinates({
      x: rect.left,
      y: rect.top,
    });
    const fixZoom = zoomPanelCoordinates.zoomFix || 1;
    highlight.style.left = `${zoomPanelCoordinates.x - 1}px`;
    highlight.style.top = `${zoomPanelCoordinates.y - 1}px`;
    highlight.style.width = `${rect.width * fixZoom + 2}px`;
    highlight.style.height = `${rect.height * fixZoom + 2}px`;
    container.append(highlight);
  }
};

export default drawHighlights;
