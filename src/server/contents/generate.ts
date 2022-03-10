/* eslint-disable no-await-in-loop */
import * as path from 'path';
import { ensureDir } from '@a2r/fs';
import log from 'loglevel';
import books from './data/books';
import download from './download';
import oneFileToPath from './oneFileToPath';
import { cdnDomain } from '../config';

/**
 * Generates contents (by downloading them)
 * @param cdn CDN Domain. If not provided, will use `CDN_URL` environment variable. Defaults to `cdn.emp.binpar.cloud`-
 * @param destDir Destination folder. Defaults to `web/hooks`.
 */
const generate = async (cdn?: string, destDir?: string): Promise<void> => {
  log.setLevel('info');
  const cndToUse = cdn || cdnDomain;
  const booksPath = destDir || path.join(__dirname, '../../../web/books');
  await ensureDir(booksPath);
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const remoteURI = `https://${cndToUse!}/books/${book}/${book}.bp`;
    const bookPath = `${booksPath}/${book}`;
    const bookFile = `${booksPath}/${book}/${book}.bp`;
    try {
      await ensureDir(bookPath);
      await download(remoteURI, bookFile);
      await oneFileToPath(bookFile, bookPath);
    } catch (ex) {
      log.error(`Error downloading ${remoteURI}:`);
      log.error(ex);
    }
  }
};

export default generate;
