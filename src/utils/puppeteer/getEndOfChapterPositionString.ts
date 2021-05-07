/**
 * Get the position of the end of chapter div marker
 * @returns {string} containing the x and the y position separated by a '-'
 */
const getEndOfChapterPositionString = () => {
  const rect = document
    ?.querySelector('.rg-end-of-chapter-calculator')
    ?.getBoundingClientRect();
  return `${rect?.x}-${rect?.y}`;
}

export default getEndOfChapterPositionString;