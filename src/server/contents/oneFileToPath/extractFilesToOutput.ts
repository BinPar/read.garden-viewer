/* eslint-disable no-await-in-loop */
import * as path from 'path';
import { ensureDir, writeFile } from '@a2r/fs';

import { ExtractedJSONIndexInfo } from '../../../model/oneFileToPath';

import { open, readFileBytes } from './fileHandlers';
import fastEncrypt from './fastEncrypt';

/**
 * Extracts contents from single compressed files to provided path
 * @param pathToFile Path to compressed file
 * @param jsonIndexInfo JSON Index info (containing bytes positions information)
 * @param outputPath Path to write contents to
 */
const extractFilesToOutput = async (
  pathToFile: string,
  jsonIndexInfo: ExtractedJSONIndexInfo,
  outputPath: string,
): Promise<void> => {
  await ensureDir(outputPath, { recursive: true });
  const { jsonIndexStartByte, jsonIndex, jsonIndexLength, encrypted } = jsonIndexInfo;
  const outputPaths = Object.keys(jsonIndex);
  const fd = await open(pathToFile, 'r');
  for (let i = 0, l = outputPaths.length; i < l; i += 1) {
    const relativePath = outputPaths[i];
    const absolutePath = path.join(outputPath, relativePath);
    await ensureDir(path.dirname(absolutePath));
    let { start } = jsonIndex[relativePath];
    const { length } = jsonIndex[relativePath];
    if (start >= jsonIndexStartByte) {
      start += jsonIndexLength;
    }    
    let fileBase64Data = await readFileBytes(fd, length, start);
    if (encrypted) {
      fileBase64Data = fastEncrypt(fileBase64Data);
    }
    await writeFile(absolutePath, fileBase64Data, 'base64');
  }
};

export default extractFilesToOutput;
