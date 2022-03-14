/**
 * Viewer mode
 */
 export enum ViewerMode {
  /**
   * Paginated viewer. One page shown at the same time.
   */
  Paginated = 'paginated',
  /**
   * Viewer with scroll. All content shown, scrollable.
   */
  WithScroll = 'withScroll',
  /**
   * Flow viewer.
   */
  Flow = 'flow',
}

/**
 * Possible fit modes
 */
 export enum FitMode {
  /**
   * Fit width
   */
  Width = 'width',
  /**
   * Fit height
   */
  Height = 'height',
  /**
   * Fit page
   */
  Page = 'page',
}

/**
 * Zoom state
 */
export interface Zoom {
  /**
   * Minimum zoom value (`1` based like CSS property)
   */
  min: number;
  /**
   * Maximum zoom value (`1` based like CSS property)
   */
  max: number;
  /**
   * Zoom steps for range input change and controls
   */
  steps: number[];
}

export interface FontSize {
  /**
   * Minimum font size (pixels)
   */
  min: number;
  /**
   * Maximum font size (pixels)
   */
  max: number;
  /**
   * Font size steps for range input change and controls
   */
  step: number;
}

/**
 * Viewer margins. Content will be rendered inside these margins but will overflow
 * for cosmetic reasons. Fit width and fit height will take margins into account.
 * Content will also be centered taking this margins into account.
 */
export interface Margin {
  /**
   * Top margin (pixels)
   */
  top: number;
  /**
   * Right margin (pixels)
   */
  right: number;
  /**
   * Bottom margin (pixels)
   */
  bottom: number;
  /**
   * Left margin (pixels)
   */
  left: number;
}

export type ViewerTheme = 'dark' | 'light';

/**
 * Layout types
 */
 export enum LayoutTypes {
  Fixed = 'fixed',
  Flow = 'flow',
}

/**
 * Available text align modes
 */
export type TextAlignModes = 'start' | 'justify' | null;

/**
 * Available scroll modes
 */
export type ScrollModes = 'vertical' | 'horizontal';

/**
 * Available line height values
 */
export type LineHeight = 1.25 | 1.5 | 1.75;

/**
 * New content for viewer
 */
export interface NewContent {
  /**
   * Layout type
   */
  layout: LayoutTypes;
  /**
   * First level content slug (book, work...)
   */
  slug: string;
  /**
   * Second level content slug (page, chapter...)
   */
  contentSlug: string;
  /**
   * Chapter number (for flow)
   */
  chapterNumber?: number;
  /**
   * Second level content label (page, chapter...)
   */
  label: string;
  /**
   * Content CSS URL
   */
  cssURL: string;
  /**
   * Content HTML
   */
  htmlContent: string;
}

export interface SelectionOption {
  key: string;
  title: string;
  color: string;
  className?: string;
  style?: string;
  selected?: boolean;
}

export interface SelectionPointer {
  querySelector: string;
  offset: number;
}

export interface SelectionRange {
  obfuscatedText: string;
  start: SelectionPointer;
  end: SelectionPointer;
}

export interface HighlightInfo extends SelectionRange {
  key: string;
}

export interface UserHighlightInfo extends HighlightInfo {
  highlighterKey: string;
  color: string;
}

export interface HighlightDeleteOption {
  title: string;
  className?: string;
  style?: string;
}

export interface TextCopyOption {
  title: string;
  className?: string;
  style?: string;
  disabled?: boolean;
}

export interface MenuPosition {
  top: number;
  left: number;
  arrowDown: boolean;
}