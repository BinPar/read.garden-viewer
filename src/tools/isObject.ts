const isObject = (value: any): boolean =>
  typeof value === 'object' && value !== null;

export default isObject;