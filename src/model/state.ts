import { Config } from './config';
import { FitMode, Margin } from './viewer';

export interface InitialState {
  /**
   * Viewer config
   */
  config: Config;
  /**
   * Viewport margins 
   */
  margin: Margin;
}

export interface GlobalState extends InitialState {
  /**
   * Needs a complete reset of the view
   */
  layoutResetRequired?: boolean;
  /**
   * Page title
   */
  title: string;
  /**
   * Current scale value (`1` based like CSS property)
   */
  scale: number;
  /**
   * Current page number
   */
  pageNumber: number;
  /**
   * Current page label
   */
  pageLabel: string;
  /**
   * Search terms to highlight
   */
  searchTerms: string[];
}

export interface FixedState {
  layout: 'fixed';
  /**
   * Fit mode (width/height/none)
   */
  fitMode?: FitMode;
  /**
   * When content is taller than viewport so vertical scroll is active
   */
  hasVerticalScroll: boolean;
  /**
   * Minimum vertical translate
   */
  minVerticalTranslate: number;
  /**
   * Maximum vertical translate
   */
  maxVerticalTranslate: number;
  /**
   * Current vertical translate
   */
  verticalTranslate: number;
  /**
   * When content is wider than viewport so horizontal scroll is active
   */
  hasHorizontalScroll: boolean;
  /**
   * Minimum horizontal translate
   */
  minHorizontalTranslate: number;
  /**
   * Maximum horizontal translate
   */
  maxHorizontalTranslate: number;
  /**
   * Current horizontal translate
   */
  horizontalTranslate: number;

  // loadedPages: string[];
}

/**
 * Available text align modes
 */
 export type TextAlignModes = 'start' | 'justify' | null;

export interface FlowState {
  /**
   * Needs to recalculate paginations
   */
  invalidatedPagination?: boolean;
  layout: 'flow';
  /**
   * Read mode
   */
  readMode: boolean;
  /**
   * Current font size (pixels)
   */
  fontSize: number;
  /**
   * Current font family
   */
  fontFamily: string;
  /**
   * Current text align. `null` means auto (content's original align)
   */
  textAlign: TextAlignModes;
  /**
   * Space between columns (pixels)
   */
  columnGap: number;
  /**
   * Total chapter width (pixels)
   */
  totalChapterWidth: number;
  /**
   * Total column width including gap (pixels)
   */
  totalColumnWidth: number;
  /**
   * Number of total columns
   */
  totalColumns: number;
  /**
   * Number of visible columns in viewport
   */
  columnsInViewport: number;
  /**
   * Scroll snaps (pixels)
   */
  snaps: number[];
  /**
   * Pages labels
   */
  labels: string[];
}

export interface PaginatedState {
  scrollMode: 'fixed';
  /**
   * Display two pages at a time in viewport
   */
  doublePage: boolean;
}

/**
 * Available scroll modes
 */
 export type ScrollModes = 'vertical' | 'horizontal';

export interface ScrolledState {
  scrollMode: ScrollModes;
  /**
   * Current left scroll
   */
  left: number;
  /**
   * Maximum left scroll
   */
  maxLeft: number;
  /**
   * Contents total width (for container width)
   */
  totalWidth: number;
  /**
   * Contents total height (height of highest content)
   */
  totalHeight: number;
  /**
   * Whether page separation should be visible or not
   */
  showPageSeparation: boolean;
}

export type State = GlobalState &
  (
    | (FixedState & (PaginatedState | ScrolledState))
    | (FlowState & ScrolledState)
  );
