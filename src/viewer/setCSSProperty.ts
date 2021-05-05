const setCSSProperty = (property: string, value: string): void => {
  document.documentElement.style.setProperty(`--${property}`, value);
} 

export default setCSSProperty;
