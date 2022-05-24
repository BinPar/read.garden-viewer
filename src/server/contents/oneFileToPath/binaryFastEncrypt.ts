/* eslint-disable no-param-reassign */
import { encryptIndexes } from '../../config';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Exchanges pairs of chars in the string
 */
const fastEncrypt = (input: string): string => {

  let lastEqual = input.indexOf('=');
  const source = encoder.encode(input);
  const end = source.length;
  const result = new Uint8Array(end);
  let pointer = 0;

  while (pointer + 7 < end && (lastEqual < 0 || lastEqual > 7)) {
    for (let i = 0; i < 7; i++) {
      result[pointer + i] = source[pointer + encryptIndexes[i]];
    }
    pointer += 7;
    lastEqual -= 7;
  }
  for (let i = pointer; i < end; i++) {
    result[i] = source[i];
  }
  return decoder.decode(result);
};

export default fastEncrypt;
