/**
 * Removes highlights from provided container
 * @param container DOM Element containing highlights
 */
const removeLayerHighlights = (container: HTMLDivElement): void => {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = '';
};

export default removeLayerHighlights;
