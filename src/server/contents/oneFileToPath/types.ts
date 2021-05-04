export interface JSONIndex {
  [relativePath: string]: {
    start: number;
    length: number;
  };
}

export interface ExtractedJSONIndexInfo {
  jsonIndex: JSONIndex;
  jsonIndexStartByte: number;
  jsonIndexLength: number;
}

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
