import { getState } from '../lib/state';

/**
 * Removes CSS property in document element style
 * @param property Property name (without `--`)
 */
 const removeCSSProperty = (property: string): void => {
  const state = getState();
  if (state.readGardenContainerNode) {
    document.documentElement.style.removeProperty(`--${property}`);
  }
} 

export default removeCSSProperty;
