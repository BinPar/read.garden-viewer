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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selection = (document as any).selection && (document as any).selection.createRange();
    if (selection.text) {
      return selection;
    }
  }
  return null;
};

export default getSelection;
