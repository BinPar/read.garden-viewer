const checkNode = (node: HTMLElement): void => {
  const siblings = node.childNodes;
  if (siblings) {
    for (let i = 0, l = siblings.length || 0; i < l; i++) {
      const sibling = siblings.item(i) as HTMLElement;
      if (sibling.innerText?.trim()) {
        if (sibling.childElementCount > 1) {
          checkNode(sibling);
        } else {
          sibling.classList.add('rg-text-cursor');
        }
      }
    }
  }
};

const applyTextCursor = (contentPlaceholderNode?: HTMLDivElement): void => {
  if (contentPlaceholderNode) {
    let element = contentPlaceholderNode.querySelector('[data-page]');
    if (element) {
      while (element.parentElement?.nextSibling || element.parentElement?.previousSibling) {
        element = element.parentElement;
      }
      if (element.parentElement) {
        checkNode(element.parentElement);
      }
    }
  }
};

export default applyTextCursor;
