const applyTextCursor = (contentPlaceholderNode?: HTMLDivElement): void => {
  if (contentPlaceholderNode) {
    const pageSpan = contentPlaceholderNode.querySelector('[data-page]');
    if (pageSpan?.parentNode) {
      const siblings = pageSpan.parentNode.childNodes;
      for (let i = 0, l = siblings.length || 0; i < l; i++) {
        const node = siblings.item(i) as HTMLElement;
        if (node.innerText?.trim()) {
          node.classList.add('rg-text-cursor');
        }
      }
    }
  }
};

export default applyTextCursor;
