import { Base64 } from 'js-base64';

import { JSONIndex, ExtractedJSONIndexInfo } from './types';

import { stat, open, readFileBytes } from './fileHandlers';

const JSON_INDEX_BYTES = 32;

const extractJsonIndex = async (
  pathToOneFile: string,
): Promise<ExtractedJSONIndexInfo> => {
  const fileStats = await stat(pathToOneFile);
  if (fileStats && fileStats.size) {
    const { size } = fileStats;
    const fd = await open(pathToOneFile, 'r');
    const base64JsonIndexPosition = await readFileBytes(
      fd,
      JSON_INDEX_BYTES,
      size - JSON_INDEX_BYTES,
    );
    const [jsonIndexPosition, jsonIndexLength] = Base64.fromBase64(
      base64JsonIndexPosition,
    )
      .split('-')
      .map((bytes) => parseInt(bytes, 10));
    // console.log(`Position: ${jsonIndexPosition} - Length: ${jsonIndexLength}`);
    const base64JsonIndex = await readFileBytes(
      fd,
      jsonIndexLength,
      jsonIndexPosition,
    );
    return {
      jsonIndex: JSON.parse(Base64.fromBase64(base64JsonIndex)) as JSONIndex,
      jsonIndexLength,
      jsonIndexStartByte: jsonIndexPosition,
    };
  }
  throw new Error('Not found');
};

export default extractJsonIndex;
