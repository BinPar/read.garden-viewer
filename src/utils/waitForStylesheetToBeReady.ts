import wait from '../tools/wait';

/**
 * Waits until provided style sheet is loaded by checking property `cssRules` which is only
 * populated once the style sheet is ready
 * @param stylesheet CSS Style Sheet
 */
const waitForStylesheetToBeReady = async (stylesheet: CSSStyleSheet): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    stylesheet.cssRules;
    return await Promise.resolve();
  } catch {
    await wait(10);
    return waitForStylesheetToBeReady(stylesheet);
  }
};

export default waitForStylesheetToBeReady;
