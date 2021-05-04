import { promisify } from 'util';
import * as fs from 'fs';

import { BufferEncoding } from './types';

export const stat = promisify(fs.stat);
export const open = promisify(fs.open);
export const read = promisify(fs.read);

export const readFileBytes = async (
  fd: number,
  length: number,
  position: number,
  encoding: BufferEncoding = 'base64',
): Promise<string> => {
  const buffer = Buffer.alloc(length);
  const res = await read(fd, buffer, 0, length, position);
  const bytes = buffer.toString(encoding, 0, res.bytesRead);
  return bytes;
};