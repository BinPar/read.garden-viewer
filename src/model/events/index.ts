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

/**
 * On new content needed
 */
export interface LoadNewContent extends ReadGardenEvent {
  type: 'loadNewContent';
  /**
   * Slug of the first level content (book, work...) to load
   */
  slug: string;
  /**
   * Slug of the second level content (page, chapter...) to load
   */
  contentSlug: string;
}

export interface GetContentsInfo extends ReadGardenEvent {
  type: 'getContentsInfo';
  /**
   * Slug of the first level content (book, work...)
   */
  slug: string;
}

export interface GetTerms extends ReadGardenEvent {
  type: 'getTerms';
  /**
   * Slug of the first level  content (book, work...)
   */
  slug: string;
  /**
   * Text to look for
   */
  text: string;
}

export type ReadGardenEvents = PageChange | LoadNewContent | GetContentsInfo | GetTerms;

export type ReadGardenEventHandler = (event: ReadGardenEvents) => Promise<void>;

export type CurrentPromiseEnder = (() => void) | null;

export interface UniqueKeyPromiseEnder {
  key?: string;
  resolve: () => void;
  reject: () => void;
}
