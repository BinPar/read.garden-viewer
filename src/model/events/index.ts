export interface ReadGardenEvent {
  type: string;
}

/**
 * On page change event
 */
export interface PageChange extends ReadGardenEvent{
  type: 'pageChange';
  /**
   * New page label
   */
  label: string;
}

export interface RequestChapter extends ReadGardenEvent{
  type: 'requestChapter';
}

export type ReadGardenEvents = PageChange | RequestChapter;

export type ReadGardenEventHandler = (event: ReadGardenEvents) => Promise<void>;