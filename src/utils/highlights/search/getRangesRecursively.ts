import getSearchHighlightsRanges from './getSearchHighlightsRanges';

const getRangesRecursively = (container: HTMLElement, terms: string[], firstCall = false): Range[] => {
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
