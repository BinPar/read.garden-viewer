/**
 * Removes highlights from provided container
 * @param container DOM Element containing highlights
 */
const removeHighlights = (container: HTMLDivElement): void => {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = '';
};

export default removeHighlights;
