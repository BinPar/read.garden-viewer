/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/**
 * Gets selection if client side
 * @returns Selection
 */
const getSelection = (): Selection | null => {
  if (window) {
    const { document } = window;
    if (window.getSelection) {
      return window.getSelection();
    }
    if (document.getSelection) {
      return document.getSelection();
    }
    const selection = (document as any).selection && (document as any).selection.createRange();
    if (selection.text) {
      return selection as Selection;
    }
  }
  return null;
};

export default getSelection;
