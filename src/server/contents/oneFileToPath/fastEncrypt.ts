/* eslint-disable no-param-reassign */
/**
 * Exchanges pairs of chars in the string
 */
const fastEncrypt = (input: string): string => {
  let result = '';
  while (input.length > 7) {
    result += `${input[6]}${input[5]}${input[4]}${input[3]}${input[2]}${input[1]}${input[0]}`;
    input = input.substring(7);
  }
  if (input) {
    result += input;
  }
  return result;
};

export default fastEncrypt;
