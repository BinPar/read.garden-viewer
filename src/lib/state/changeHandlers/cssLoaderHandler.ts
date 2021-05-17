import { StatePropChangeHandler } from '../../../model/state';
import getPropertyChangeHandler from '../../../utils/getPropertyChangeHandler';

const { resolver, waiter } = getPropertyChangeHandler(true);

/**
 * Waits for `cssLoaded` property to be `true`. If there is a previous promise waiting, it will
 * get rejected, so after calling multiple times before CSS is ready, the result will be all
 * promises being rejected except for the **last one**, working like some kind of debouncer.
 * If you intend to use this method to resolve **all** pending promises once the CSS is loaded,
 * you are doing it wrong.
 * @returns Promise<void>
 */
export const onCssLoaded = waiter;

/**
 * Change handler
 */
const cssLoaderHandler: StatePropChangeHandler<'cssLoaded'> = {
  property: 'cssLoaded',
  value: true,
  handler: resolver,
};

export default cssLoaderHandler;
