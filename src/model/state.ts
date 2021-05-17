import { Config } from './config';
import { FitMode, Margin } from './viewerSettings';

/**
 * Global state
 */
export interface GlobalState {
  /**
   * Current slug
   */
  slug: string;
  /**
   * Read mode
   */
  readMode: boolean;

  /**
   * Security Margins
   */
  securityMargins: {
    /**
     * Read Mode Safe Margins
     */
    readMode: Margin;
    /**
     * User Interface Mode Safe Margins
     */
    uiMode: Margin;
  };

  /**
   * Main viewer DOM node
   */
  readGardenViewerNode?: HTMLDivElement;
  /**
   * Content wrapper DOM node
   */
  contentWrapperNode?: HTMLDivElement;
  /**
   * Content placeholder DOM node
   */
  contentPlaceholderNode?: HTMLDivElement;
  /**
   * End of chapter calculator DOM node
   */
  endOfChapterCalculatorNode?: HTMLDivElement;
  /**
   * Pages labels container DOM node
   */
  pagesLabelsNode?: HTMLDivElement;
  /**
   * Selection highlights layer DOM node
   */
  selectionHighlightsNode?: HTMLDivElement;
  /**
   * Selection selectors layer DOM node
   */
  selectionSelectorsNode?: HTMLDivElement;
  /**
   * Search terms highlights layer DOM node
   */
  searchTermsHighlightsNode?: HTMLDivElement;
  /**
   * Dynamic styles DOM node
   */
  dynamicStyleNode?: HTMLLinkElement;
  /**
   * Main styles DOM node (read.garden-viewer.css)
   */
  mainStyleNode?: HTMLLinkElement;
  /**
   * Content wrapper is ready
   */
  wrapperReady: boolean;
  /**
   * CSS and fonts are loaded for the current content
   */
  cssLoaded: boolean;
  /**
   * Viewer is recalculating
   */
  recalculating: boolean;
  /**
   * Viewer config
   */
  config: Config;
  /**
   * Viewport margins
   */
  margin: Margin;
  /**
   * Container width
   */
  containerWidth: number;
  /**
   * Container height
   */
  containerHeight: number;
  /**
   * Needs a complete reset of the view
   */
  layoutResetRequired?: boolean;
  /**
   * Basic DOM elements have been created
   */
  basicDOMElementsCreated: boolean;
  /**
   * Debug viewer safe area flag
   */
  debugViewerSafeArea: boolean;
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

/**
 * Default global state
 */
export type DefaultGlobalState = Partial<GlobalState> &
  Required<
    Pick<
      GlobalState,
      'scale' | 'basicDOMElementsCreated' | 'cssLoaded' | 'recalculating' | 'wrapperReady' | 'securityMargins' | 'readMode'
    >
  >;

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

export interface FixedContentInfo {
  /**
   * Content height
   */
  height: number;
  /**
   * Content width
   */
  width: number;
  /**
   * Content label
   */
  label: string;
  /**
   * Content slug
   */
  slug: string;
}

export interface FixedState {
  /**
   * Layout type
   */
  layout: LayoutTypes.Fixed;
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
  /**
   * Container by label map
   */
  containerByLabel: Map<string, HTMLDivElement>;
  // loadedPages: string[];
}

export interface FlowState {
  /**
   * Layout type
   */
  layout: LayoutTypes.Flow;
  /**
   * Needs to recalculate pagination
   */
  invalidatedPagination?: boolean;
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
   * Column width without gap (pixels)
   */
  columnWidth: number;
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
/**
 * Default global state
 */
export type DefaultFlowState = Omit<FlowState, 'columnGap' | 'readMode'>;

export interface PaginatedState {
  scrollMode: 'fixed';
  /**
   * Display two pages at a time in viewport
   */
  doublePage: boolean;
}

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
  /**
   * Map where labels are keys and position is value (left for horizontal, top for vertical)
   */
  positionByLabel: Map<string, number>;
  /**
   * Map where positions are keys (left for horizontal, top for vertical) and labels are values
   */
  labelByPosition: Map<number, string>;
}

export type State = GlobalState &
  ((FixedState & (PaginatedState | ScrolledState)) | (FlowState & ScrolledState));

export type PropChangeHandler = () => void;

export interface StatePropChangeHandler<K extends keyof State> {
  property: K;
  value: State[K];
  handler: PropChangeHandler;
}

export interface PropertyChangeHandler {
  /**
   * Method that gets executed once property is updated to desired value. Should be passed as
   * `handler` property in `StatePropChangeHandler`
   */
  resolver: PropChangeHandler;
  /**
   * Method that can be used to wait until property is updated to desired value. Should be used
   * inside related viewer action
   */
  waiter: (uniqueKey?: string) => Promise<void>;
}
