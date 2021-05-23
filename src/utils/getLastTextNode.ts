/**
 * Gets first text node from all descendants in provided element
 * @param element DOM Element
 * @returns First text node or `null`
 */
 const getLastTextNode = (element: Node): Node | null => {
  if (element.nodeType === Node.TEXT_NODE) {
    return element;
  }
  let result: Node | null = null;
  const children = Array.from(element.childNodes).reverse();
  for (let i = 0, l = children.length; i < l && !result; i++) {
    const node = children[i];
    if (node.nodeType === Node.TEXT_NODE) {
      result = node;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      result = getLastTextNode(node as Element);
    }
  }
  return result;
};

export default getLastTextNode;
