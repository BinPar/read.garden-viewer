import { State } from "../../model/state";

/**
 * Returns top scroll position in pixels
 */
const getScrollTopPosition = (state: State): number => state.scrollTop * -1;

export default getScrollTopPosition;
