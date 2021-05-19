/**
 * Removes highlights from provided container
 * @param container DOM Element containing highlights
 */
const removeHighlights = (container: HTMLDivElement): void => {
  container.querySelectorAll('.rg-highlight').forEach((hl): void => {
    hl.remove();
  });
};

export default removeHighlights;
