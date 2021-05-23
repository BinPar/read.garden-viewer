const getNextSibling = (node: Node): Node | null => {
  if (node.nextSibling) {
    return node.nextSibling;
  }
  if (node.parentNode) {
    return getNextSibling(node.parentNode);
  }
  return null;
};

export default getNextSibling;
