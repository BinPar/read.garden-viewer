import wait from '../tools/wait';

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
