/**
 * De-duplicates selection rectangles (some times there are duplicated rectangles,
 * specially in Google Chrome)
 * @param {DOMRectList | DOMRect[] | undefined} rectangles - Rectangles to be de-duplicated
 * @returns {DOMRect[]} New list of rectangles
 */
const deduplicateRectangles = (rectangles: DOMRectList | DOMRect[] | undefined): DOMRect[] => {
  const result = new Array<DOMRect>();
  let lastRect: DOMRect | null = null;
  if (rectangles) {
    for (let i = 0; i < rectangles.length; i++) {
      const rect = rectangles[i];
      // Consecutive chrome rectangles
      if (
        lastRect &&
        Math.abs(lastRect.y - rect.y) < 4 &&
        Math.abs(lastRect.height - rect.height) < 4 &&
        lastRect.x + lastRect.width + 4 >= rect.x
      ) {
        lastRect.width = rect.width + rect.x - lastRect.x;
      } else if (
        result.some(
          (prevRect): boolean =>
            prevRect &&
            prevRect.y - 4 <= rect.y &&
            prevRect.x - 4 <= rect.x &&
            prevRect.width + prevRect.x + 4 >= rect.width + rect.x &&
            prevRect.height + prevRect.y + 4 >= rect.height + rect.y,
        )
      ) {
        // Contained in the previous rectangle
      } else {
        result.push(rect);
        lastRect = rect;
      }
    }
  }
  return result;
};

export default deduplicateRectangles;
