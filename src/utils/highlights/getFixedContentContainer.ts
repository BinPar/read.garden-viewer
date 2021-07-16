const getFixedContentContainer = (node: Node): HTMLElement | null => {
  let current = node as HTMLElement;
  while (current.parentElement && !current.dataset?.slug) {
    current = current.parentElement;
  }
  if (current.dataset?.slug) {
    return current;
  }
  return null;
};

export default getFixedContentContainer;
