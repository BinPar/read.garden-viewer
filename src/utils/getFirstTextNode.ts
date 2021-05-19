/**
 * Gets first text node from all descendants in provided element
 * @param element DOM Element
 * @returns First text node or `null`
 */
const getFirstTextNode = (element: Element): Node | null => {
  let result: Node | null = null;
  const children = Array.from(element.childNodes);
  for (let i = 0, l = children.length; i < l && !result; i++) {
    const node = children[i];
    if (node.nodeType === Node.TEXT_NODE) {
      result = node;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      result = getFirstTextNode(node as Element);
    }
  }
  return result;
};

export default getFirstTextNode;
