/**
 * Sorts search terms to always highlight longest coincidences. Method doesn't modify original
 * array, it returns a new array.
 * @param terms Search terms
 * @returns Sorted search terms
 */
const getSortedTerms = (terms: string[]): string[] => terms.slice().sort((a, b) => {
  const aLength = a.split(' ').length;
  const bLength = b.split(' ').length;
  if (aLength === 1 && bLength === 1) {
    return b[0].length - a[0].length;
  }
  return bLength - aLength;
});

export default getSortedTerms;
