/**
 * Removes CSS property in document element style
 * @param property Property name (without `--`)
 */
 const removeCSSProperty = (property: string): void => {
  document.documentElement.style.removeProperty(`--${property}`);
} 

export default removeCSSProperty;
