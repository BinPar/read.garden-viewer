/**
 * Gets the query Selector String from a specific DOM Node
 * @param {Node} node DOM node to get The Query Selector
 * @returns {string} Custom compressed Query Selector pointer to the node
 */
 const getQuerySelectorFromNode = (node: Node): string => {
  const element = node as HTMLElement;
  if (element.dataset && element.dataset.id) {
    return `${element.tagName.toLowerCase()}[data-id="${element.dataset.id}"]`;
  }
  if (element.id) {
    return `#${element.id}`;
  }
  if (node.parentNode) {
    // It is not a selectable HTMLElement or another type of node
    const parentQuerySelector = getQuerySelectorFromNode(node.parentNode);
    let childIndex = 0;
    let child: Node | null = node;

    while (child.previousSibling) {
      child = child.previousSibling;
      childIndex++;
    }

    // To compress the Nth Child Selector we use {childNumber} expression
    // at the end of the string
    return `${parentQuerySelector}{${childIndex}}`;
  }
  throw new Error('Can not find Query Selection from node');
};

export default getQuerySelectorFromNode;
