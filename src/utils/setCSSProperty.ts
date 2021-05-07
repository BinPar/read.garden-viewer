/**
 * Sets CSS property in document element style
 * @param property Property name (without `--`)
 * @param value Property desired value
 */
const setCSSProperty = (property: string, value: string): void => {
  document.documentElement.style.setProperty(`--${property}`, value);
} 

export default setCSSProperty;
