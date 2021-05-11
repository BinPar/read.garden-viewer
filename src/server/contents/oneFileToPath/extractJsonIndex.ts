import { Base64 } from 'js-base64';
import log from 'loglevel';

import { JSONIndex, ExtractedJSONIndexInfo } from '../../../model/oneFileToPath';

import fastEncrypt from './fastEncrypt';
import { stat, open, readFileBytes } from './fileHandlers';

const JSON_INDEX_BYTES = 32;

/**
 * Extracts json index from compressed file
 * @param pathToFile Path to compressed file
 * @returns Extracted JSON Index info
 */
const extractJsonIndex = async (pathToFile: string): Promise<ExtractedJSONIndexInfo> => {
  const fileStats = await stat(pathToFile);
  if (fileStats && fileStats.size) {
    const { size } = fileStats;
    const fd = await open(pathToFile, 'r');
    const base64JsonIndexPosition = await readFileBytes(
      fd,
      JSON_INDEX_BYTES,
      size - JSON_INDEX_BYTES,
    );
    const [jsonIndexPosition, jsonIndexLength] = Base64.fromBase64(base64JsonIndexPosition)
      .split('-')
      .map((bytes) => parseInt(bytes, 10));

    log.info({
      jsonIndexLength,
      jsonIndexPosition,
    });

    let base64JsonIndex = await readFileBytes(fd, jsonIndexLength, jsonIndexPosition);

    const encrypted = base64JsonIndex.indexOf('ey') !== 0;

    if (encrypted) {
      base64JsonIndex = fastEncrypt(base64JsonIndex);      
    }

    return {
      encrypted,
      jsonIndex: JSON.parse(Base64.fromBase64(base64JsonIndex)) as JSONIndex,
      jsonIndexLength,
      jsonIndexStartByte: jsonIndexPosition,
    };
  }
  throw new Error('Not found');
};

export default extractJsonIndex;
