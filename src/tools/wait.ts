/**
 * Returns a promise that is resolved after waiting the provided amount of milliseconds using
 * `setTimeout`
 * @param ms Milliseconds to wait
 * @returns 
 */
const wait = (ms: number): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export default wait;
