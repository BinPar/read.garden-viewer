/* eslint-disable no-param-reassign */

import { encryptIndexes } from '../../config';

/**
 * Exchanges pairs of chars in the string
 */
const fastEncrypt = (input: string): string => {
  let result = '';
  while (input.length > 7) {
    result += `${input[encryptIndexes[0]]}${input[encryptIndexes[1]]}${
      input[encryptIndexes[2]]
    }${input[encryptIndexes[3]]}${input[encryptIndexes[4]]}${
      input[encryptIndexes[5]]
    }${input[encryptIndexes[6]]}`;
    input = input.substring(7);
  }
  if (input) {
    result += input;
  }
  return result;
};

export default fastEncrypt;
