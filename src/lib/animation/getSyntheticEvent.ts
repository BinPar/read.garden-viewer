import { SyntheticEvent } from '../../model/dom';

/**
 * Generates a synthetic event from a mouse or touch event
 * @param {MouseEvent | TouchEvent} ev - Mouse or touch event to generate the synthetic event
 */
const getSyntheticEvent = (ev: MouseEvent | TouchEvent): SyntheticEvent => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { rangeParent, rangeOffset } = ev as any;
  const { clientX, clientY } = (ev as TouchEvent).touches && (ev as TouchEvent).touches.length > 0
    ? (ev as TouchEvent).touches[0]
    : (ev as MouseEvent);
  return {
    rangeParent,
    rangeOffset,
    clientX,
    clientY,
  };
};

export default getSyntheticEvent;
