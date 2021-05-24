import { State } from "../../model/state";

/**
 * Returns left scroll position in pixels
 */
const getScrollLeftPosition = (state: State): number => state.scrollLeft * -1;

export default getScrollLeftPosition;
