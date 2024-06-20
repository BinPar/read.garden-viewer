import { getState } from '../lib/state';

/**
 * Sets CSS property in document element style
 * @param property Property name (without `--`)
 * @param value Property desired value
 */
const setCSSProperty = (property: string, value: string): void => {
  const state = getState();
  if (state.readGardenContainerNode) {
    document.documentElement.style.setProperty(`--${property}`, value);
  }
};

export default setCSSProperty;
