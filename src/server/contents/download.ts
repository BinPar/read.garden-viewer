import * as fs from 'fs';
import * as https from 'https';

const download = (url: string, filePath: string): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https
      .get(url, (response): void => {
        if (response.statusCode !== 200) {
          reject(new Error(`Response status was ${response.statusCode}`));
        } else {
          console.log(`Downloading ${url}...`);
          response.on('close', (): void => {
            console.log(`Downloaded ${url}...`);
            file.close();
            return resolve();
          });
          response.pipe(file);
        }
      })
      .on('error', reject);
  });

export default download;
