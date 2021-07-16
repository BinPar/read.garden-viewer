import getSearchHighlightsRanges from './getSearchHighlightsRanges';

/**
 * Traverses provided node looking for nodes with at least one text node as a child and
 * containing inside at least one of the provided terms. If that's the case, it looks for terms
 * and gets ranges for them.
 * @param container Node to traverse looking for terms and getting ranges for them
 * @param terms Terms to look for
 * @param firstCall Denotes this is the first call to method
 */
const getRangesRecursively = (
  container: HTMLElement,
  terms: string[],
  firstCall = false,
): Range[] => {
  const termsKey = terms.join('|');
  if (container.dataset && container.dataset.highlighted === termsKey) {
    return [];
  }
  if (firstCall && container.dataset) {
    // eslint-disable-next-line no-param-reassign
    container.dataset.highlighted = termsKey;
  }
  if (
    !terms.length ||
    !terms.some((t) => container.innerText && container.innerText.indexOf(t) !== -1)
  ) {
    return [];
  }
  const ranges: Range[] = [];
  const children = Array.from(container.childNodes);
  if (children.some((n) => n.nodeType === Node.TEXT_NODE && n.nodeValue?.trim())) {
    return getSearchHighlightsRanges(container, terms);
  }
  for (let i = 0, l = children.length; i < l; i++) {
    const child = children[i] as HTMLElement;
    const hasTextNodesChildren = Array.from(child.childNodes).some(
      (n) => n.nodeType === Node.TEXT_NODE && n.nodeValue?.trim(),
    );
    if (hasTextNodesChildren) {
      ranges.push(...getSearchHighlightsRanges(child, terms));
    } else {
      ranges.push(...getRangesRecursively(child, terms));
    }
  }
  return ranges;
};

export default getRangesRecursively;
