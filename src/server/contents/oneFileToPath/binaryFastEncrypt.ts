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
  input = '';
  const swap = new Uint8Array(7);
  let pointer = 0;
  while (pointer + 7 < source.length && (lastEqual < 0 || lastEqual > 7)) {
    for (let i = 0; i < 7; i++) {
      swap[i] = source[pointer + encryptIndexes[i]];
    }
    source.set(swap, pointer);
    pointer += 7;
    lastEqual -= 7;
  }
  return decoder.decode(source);
};

export default fastEncrypt;
