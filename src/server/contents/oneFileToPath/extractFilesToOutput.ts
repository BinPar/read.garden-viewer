/* eslint-disable no-await-in-loop */
import * as path from 'path';
import { ensureDir, writeFile } from '@a2r/fs';

import { ExtractedJSONIndexInfo } from '../../../model/oneFileToPath';

import { open, readFileBytes } from './fileHandlers';

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
  const { jsonIndexStartByte, jsonIndex, jsonIndexLength } = jsonIndexInfo;
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
    await writeFile(absolutePath, await readFileBytes(fd, length, start), 'base64');
  }
};

export default extractFilesToOutput;
