/* eslint-disable no-await-in-loop */
import * as path from 'path';
import { readFile, writeFile } from '@a2r/fs';
import { Base64 } from 'js-base64';
import fastEncrypt from '../../src/server/contents/oneFileToPath/fastEncrypt';
import binaryFastEncrypt from '../../src/server/contents/oneFileToPath/binaryFastEncrypt';

describe('Fast encrypt encoding to file problem', () => {
  it('should encrypt the string', async () => {
    for (let totalStringLength = 4; totalStringLength < 100; totalStringLength++) {
      const initialString = '</div>'.padStart(totalStringLength);      
      const base64ProblematicString = Base64.encode(initialString);
      const tempFilePath = path.join(__dirname, '../../web/books/temp.txt');      
      const encryptedBase64 = fastEncrypt(base64ProblematicString);
      const decryptedBase64 = binaryFastEncrypt(encryptedBase64);
      const decryptedString = Base64.fromBase64(decryptedBase64);
      expect(decryptedString).toBe(initialString);
      await writeFile(tempFilePath, encryptedBase64, 'base64');
      const readEncryptedBase64File = await readFile(tempFilePath, 'base64');
      expect(readEncryptedBase64File).toBe(encryptedBase64);
      const decryptedBase64File = fastEncrypt(readEncryptedBase64File);
      const stringEncryptedFromDisk = Base64.fromBase64(decryptedBase64File);
      expect(stringEncryptedFromDisk).toBe(initialString);      
    }
  });
});
