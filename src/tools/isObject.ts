/**
 * Checks if provided value is an object (not including arrays and null)
 * @param value Variable to test
 */
const isObject = (value: any): boolean =>
  typeof value === 'object' && value !== null;

export default isObject;
