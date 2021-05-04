import { promisify } from 'util';
import * as fs from 'fs';

import { BufferEncoding } from '../../../model/oneFileToPath';

/**
 * Asynchronous stat(2) - Get file status.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
export const stat = promisify(fs.stat);

/**
 * Asynchronous open(2) - open and possibly create a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
 * If not supplied, defaults to `0o666`.
 */
export const open = promisify(fs.open);

/**
 * Asynchronously reads data from the file referenced by the supplied file descriptor.
 * @param fd A file descriptor.
 * @param buffer The buffer that the data will be written to.
 * @param offset The offset in the buffer at which to start writing.
 * @param length The number of bytes to read.
 * @param position The offset from the beginning of the file from which data should be read.
 * If `null`, data will be read from the current position.
 */
export const read = promisify(fs.read);

/**
 * Reads file bytes
 * @param fd A file descriptor.
 * @param length The number of bytes to read
 * @param position The offset from the beginning of the file from which data should be read.
 * If `null`, data will be read from the current position.
 * @param encoding Enconding. Defaults to `base64`.
 */
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
