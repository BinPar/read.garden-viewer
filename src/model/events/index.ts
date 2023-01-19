import { SelectionRange } from '../viewerSettings';

export interface ReadGardenEvent {
  type: string;
}

export interface EventWithSlugs {
  /**
   * Slug of the first level content (book, work...) to load
   */
  slug: string;
  /**
   * Product slug (in case it's different from main slug)
   */
  productSlug: string;
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
export interface LoadNewContent extends ReadGardenEvent, EventWithSlugs {
  type: 'loadNewContent';
  /**
   * Slug of the second level content (page, chapter...) to load
   */
  contentSlug: string;
  /**
   * Go to end of new content
   */
  goToEnd?: boolean;
}

export interface ContentLoaded extends ReadGardenEvent, EventWithSlugs {
  type: 'contentLoaded';
  /**
   * Loaded content slug
   */
  contentSlug: string;
}

export interface GetContentsInfo extends ReadGardenEvent, EventWithSlugs {
  type: 'getContentsInfo';
}

export interface GetTerms extends ReadGardenEvent, EventWithSlugs {
  type: 'getTerms';
  /**
   * Text to look for
   */
  text: string;
}

export interface LoadChapterInfo extends EventWithSlugs {
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
  goToEnd?: boolean;
}

export interface OnUserSelect extends ReadGardenEvent, EventWithSlugs {
  type: 'onUserSelect';
}

export interface OnHighlightClick extends ReadGardenEvent, EventWithSlugs {
  type: 'onHighlightClick';
  key: string;
  ranges: SelectionRange[];
}

export interface OnSelectionMenuOptionClick extends ReadGardenEvent, EventWithSlugs {
  type: 'onSelectionMenuOptionClick';
  key: string;
  highlightKey?: string;
  selectionInfo?: SelectionRange;
}

export interface OnCancelNewNote extends ReadGardenEvent, EventWithSlugs {
  type: 'onCancelNewNote';
}

export interface OnSaveNote extends ReadGardenEvent, EventWithSlugs {
  type: 'onSaveNote';
  note: string;
  key: string;
  highlightKey?: string;
  selectionInfo?: SelectionRange;
}

export interface OnChangeNote extends ReadGardenEvent, EventWithSlugs {
  type: 'onChangeNote';
  key: string;
  highlightKey: string;
  editing: boolean;
  note?: string;
  selectionInfo?: SelectionRange;
}

export interface OnDeleteOptionClick extends ReadGardenEvent, EventWithSlugs {
  type: 'onDeleteOptionClick';
  key: string;
}

export interface OnCopyOptionClick extends ReadGardenEvent, EventWithSlugs {
  type: 'onCopyOptionClick';
  obfuscatedText: string;
}

export interface OnLinkLoaded extends ReadGardenEvent, Pick<EventWithSlugs, 'slug'> {
  type: 'onLinkLoaded';
  link: string;
  href: string | null;
  target: string | null;
}

export interface OnLinkClick extends ReadGardenEvent, EventWithSlugs {
  type: 'onLinkClick';
  url: string | null;
  querySelector: string;
}

export type ReadGardenEvents =
  | PageChange
  | ContentLoaded
  | LoadNewContent
  | GetContentsInfo
  | GetTerms
  | LoadNextChapter
  | LoadPreviousChapter
  | OnUserSelect
  | OnHighlightClick
  | OnSelectionMenuOptionClick
  | OnCancelNewNote
  | OnSaveNote
  | OnChangeNote
  | OnDeleteOptionClick
  | OnCopyOptionClick
  | OnLinkClick
  | OnLinkLoaded;

export type ReadGardenEventHandler = (event: ReadGardenEvents) => Promise<void>;

export type CurrentPromiseEnder = (() => void) | null;

export interface UniqueKeyPromiseEnder {
  key?: string;
  resolve: () => void;
  reject: () => void;
}
