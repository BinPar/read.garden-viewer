import clientToContentWrapperCoordinates from './clientToContentWrapperCoordinates';
import deduplicateRects from './deduplicateRects';

const drawHighlights = (container: HTMLDivElement, ranges = new Array<Range>()): void => {
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
    const zoomPanelCoordinates = clientToContentWrapperCoordinates({
      x: rect.left,
      y: rect.top,
    });
    const fixZoom = zoomPanelCoordinates.zoomFix || 1;
    highlight.style.left = `${zoomPanelCoordinates.x - 3}px`;
    highlight.style.top = `${zoomPanelCoordinates.y - 3}px`;
    highlight.style.width = `${rect.width * fixZoom + 5}px`;
    highlight.style.height = `${rect.height * fixZoom + 5}px`;
    container.append(highlight);
  }
};

export default drawHighlights;
