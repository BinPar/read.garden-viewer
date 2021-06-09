import { SelectionRange } from '../viewerSettings';

export interface ReadGardenEvent {
  type: string;
}

/**
 * On page change event
 */
export interface PageChange extends ReadGardenEvent {
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
   * Slug of the first level content (book, work...)
   */
  slug: string;
  /**
   * Text to look for
   */
  text: string;
}

export interface LoadChapterInfo {
  /**
   * Slug of the first level content (book, work...)
   */
  slug: string;
  /**
   * Current slug of the second level content (page, chapter...)
   */
  currentContentSlug: string;
}

export interface LoadNextChapter extends ReadGardenEvent, LoadChapterInfo {
  type: 'loadNextChapter';
}

export interface LoadPreviousChapter extends ReadGardenEvent, LoadChapterInfo {
  type: 'loadPreviousChapter';
}

export interface OnUserSelect extends ReadGardenEvent {
  type: 'onUserSelect';
  slug: string;
}

export interface OnHighlightClick extends ReadGardenEvent {
  type: 'onHighlightClick';
  slug: string;
  key: string;
  ranges: SelectionRange[];
}

export interface OnSelectionMenuOptionClick extends ReadGardenEvent {
  type: 'onSelectionMenuOptionClick';
  key: string;
  slug: string;
  highlightKey?: string;
  selectionInfo?: SelectionRange;
}

export interface OnDeleteOptionClick extends ReadGardenEvent {
  type: 'onDeleteOptionClick';
  key: string;
  slug: string;
}

export type ReadGardenEvents =
  | PageChange
  | LoadNewContent
  | GetContentsInfo
  | GetTerms
  | LoadNextChapter
  | LoadPreviousChapter
  | OnUserSelect
  | OnHighlightClick
  | OnSelectionMenuOptionClick
  | OnDeleteOptionClick;

export type ReadGardenEventHandler = (event: ReadGardenEvents) => Promise<void>;

export type CurrentPromiseEnder = (() => void) | null;

export interface UniqueKeyPromiseEnder {
  key?: string;
  resolve: () => void;
  reject: () => void;
}
