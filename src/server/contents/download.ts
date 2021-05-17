import * as fs from 'fs';
import * as https from 'https';
import log from 'loglevel';

/**
 * Downloads file from URL to local disk
 * @param url URL to download
 * @param filePath File to write download content
 */
const download = (url: string, filePath: string): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https
      .get(url, (response): void => {
        if (response.statusCode !== 200) {
          reject(new Error(`Response status was ${response.statusCode}`));
        } else {
          log.info(`Downloading ${url}...`);
          response.on('error', reject);
          file.on('error', reject);
          file.on('close', (): void => {
            resolve();
          });
          response.on('close', (): void => {
            log.info(`Downloaded ${url}...`);
            file.end();
          });
          response.pipe(file);
        }
      })
      .on('error', reject);
  });

export default download;
