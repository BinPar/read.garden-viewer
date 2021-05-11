let currentResolve: (() => void) | null = null;
let currentReject: (() => void) | null = null;

/**
 * Triggered when state property `cssLoaded` is set to `true`. Will resolve pending promise
 * (if any).
 */
export const cssLoaded = (): void => {
  if (currentResolve) {
    currentResolve();
  }
  currentReject = null;
  currentResolve = null;
};

/**
 * Waits for `cssLoaded` property to be `true`. If there is a previous promise waiting, it will
 * get rejected, so after calling multiple times before CSS is ready, the result will be all
 * promises being rejected except for the **last one**, working like some kind of debouncer.
 * If you intend to use this method to resolve **all** pending promises once the CSS is loaded,
 * you are doing it wrong.
 * @returns Promise<void>
 */
export const onCssLoaded = async (): Promise<void> => {
  if (currentReject) {
    currentReject();
  }
  return new Promise<void>((resolve, reject) => {
    currentResolve = resolve;
    currentReject = reject;
  });
};
