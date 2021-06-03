/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SyntheticEvent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rangeParent: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rangeOffset: any;
  clientX: number;
  clientY: number;
}

export interface SelectionInfo {
  top: number;
  bottom: number;
  left: number;
  startContainer: Node;
  startOffset: number;
  endContainer: Node;
  endOffset: number;
}