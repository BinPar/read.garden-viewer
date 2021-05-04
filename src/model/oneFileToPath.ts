/**
 * JSON Index paths info
 */
 export interface JSONIndex {
  [relativePath: string]: {
    start: number;
    length: number;
  };
}

/**
 * Extracted JSON Index info
 */
export interface ExtractedJSONIndexInfo {
  jsonIndex: JSONIndex;
  jsonIndexStartByte: number;
  jsonIndexLength: number;
}

/**
 * Buffer encoding
 */
export type BufferEncoding =
  | 'base64'
  | 'ascii'
  | 'utf8'
  | 'utf-8'
  | 'utf16le'
  | 'ucs2'
  | 'ucs-2'
  | 'latin1'
  | 'binary'
  | 'hex'
  | undefined;
