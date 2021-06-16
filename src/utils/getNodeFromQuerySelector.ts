/**
 * Gets a DOM Node from a compressed Query Selector
 * @param {string} querySelector Query Selector
 * @returns DOM Node for the query Selector or null if it do now exist
 */
 const getNodeFromQuerySelector = (querySelector: string): Node | null => {
  if (querySelector.endsWith('}')) {
    const start = querySelector.lastIndexOf('{') + 1;
    const numberText = querySelector.substring(start, querySelector.length - 1);
    let nthChild = parseInt(numberText, 10);
    const parentExpression = querySelector.substring(0, start - 1);
    const parent = getNodeFromQuerySelector(parentExpression);
    if (parent) {
      if (nthChild >= parent.childNodes.length) {
        nthChild = parent.childNodes.length - 1;
      }
      return parent.childNodes[nthChild];
    }
    return null;
  }
  return document.querySelector(querySelector);
}

/**
 * Gets a DOM Element from a compressed Query Selector
 * @param {string} querySelector Query Selector
 * @returns DOM Element for the query Selector or null if it do now exist
 */
export const getElementFromQuerySelector = (querySelector: string): HTMLElement | null => {
  if (querySelector.endsWith('}')) {
    const start = querySelector.lastIndexOf('{') + 1;
    const parentExpression = querySelector.substring(0, start - 1);
    return getElementFromQuerySelector(parentExpression);
  }
  return document.querySelector(querySelector);
}

export default getNodeFromQuerySelector;