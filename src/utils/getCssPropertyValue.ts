/**
 * Gets CSS property value from document element style
 * @param property Property name (without `--`)
 */
const getCssPropertyValue = (property: string): void => {
  document.documentElement.style.getPropertyValue(`--${property}`);
} 

export default getCssPropertyValue;
