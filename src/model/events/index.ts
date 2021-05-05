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

export interface LoadNewContent extends ReadGardenEvent {
  type: 'loadNewContent';
  /**
   * Slug of the content to load
   */
  contentSlug: string;
  /**
   * Label of the page of the content to load (null for the default page)
   */
  label: string | null;
}

export type ReadGardenEvents = PageChange | LoadNewContent;

export type ReadGardenEventHandler = (event: ReadGardenEvents) => Promise<void>;