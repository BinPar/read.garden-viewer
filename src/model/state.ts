import { Config } from './config';
import { Coordinates } from './highlights';
import {
  FitMode,
  LayoutTypes,
  Margin,
  ScrollModes,
  TextAlignModes,
  UserHighlightInfo,
  ViewerTheme,
} from './viewerSettings';
/**
 * Global state
 */
export interface GlobalState {
  /**
   * Current slug
   */
  slug: string;
  /**
   * True if user is dragging the scroll
   */
  dragging: boolean;
  /**
   * True if user is selecting text
   */
  selectingText: boolean;
  /**
   * Scroll left position
   */
  scrollLeft: number;
  /**
   * Scroll left position
   */
  scrollTop: number;
  /**
   * Alternates read mode on document click
   */
  toggleReadModeOnClick: boolean;
  /**
   * Current content slug
   */
  contentSlug: string;
  /**
   * Read mode
   */
  readMode: boolean;
  /**
   * True when the viewer is doing an animation
   * probably it is a good idea to wait until it ends for
   * measuring hight-lights and other items
   */
  animating: boolean;
  /**
   * True when the viewer can do animations
   * if it is set to false, any view transition will be
   * applied directly without any animation
   */
  animate: boolean;
  /**
   * Speed of the animation in milliseconds
   * representing the amount of time that will take to
   * reach de desired state
   */
  animationSpeed: number;
  /**
   * Animation inertia (or tension)
   */
  animationInertia: number;
  /**
   * The friction (or resistance) used for the movement in the scroll and animations
   */
  animationFriction: number;
  /**
   * Main container DOM node
   */
  readGardenContainerNode?: HTMLDivElement;
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
   * Selection menu
   */
  selectionMenu?: HTMLDivElement | null;
  /**
   * Notes dialog
   */
  notesDialog?: HTMLDivElement | null;
  /**
   * Notes dialog
   */
  confirmationDialog?: HTMLDivElement | null;
  /**
   * Highlighters layers (key is highlighter id)
   */
  highlightersLayers: Map<string, HTMLDivElement>;
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
  /**
   * Search ranges
   */
  searchRanges: Range[];
  /**
   * Viewer theme (light, dark...)
   */
  theme: ViewerTheme;
  /**
   * Current selection range
   */
  currentSelection?: Range | null;
  /**
   * Current user highlights
   */
  currentUserHighlights: Map<string, UserHighlightInfo>;
  /**
   * Current user DOM highlights
   */
  currentUserDomHighlights: Map<string, HTMLDivElement[]>;
  /**
   * Stored coords when clicking an existing highlight
   */
  lastClickCoords?: Coordinates;
  /**
   * Force scroll to move to exact position
   */
  forceScroll?: number;
}

/**
 * Default global state
 */
export type DefaultGlobalState = Partial<GlobalState> &
  Required<
    Pick<
      GlobalState,
      | 'dragging'
      | 'selectingText'
      | 'scale'
      | 'basicDOMElementsCreated'
      | 'cssLoaded'
      | 'recalculating'
      | 'wrapperReady'
      | 'readMode'
      | 'toggleReadModeOnClick'
      | 'theme'
    >
  >;

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
  /**
   * Content order (base 0)
   */
  order: number;
  /**
   * HTML content
   */
  html?: string;
  /**
   * Content CSS URL
   */
  cssURL?: string;
}

export interface FixedViewerContentInfo extends FixedContentInfo {
  /**
   * Content container
   */
  container: HTMLDivElement;
  /**
   * Left position (where content starts on horizontal scroll)
   */
  left: number;
  /**
   * Max left position (to identify current page on horizontal scroll)
   */
  maxLeft: number;
  /**
   * Top position (where content starts on vertical scroll)
   */
  top: number;
  /**
   * Max top position (to identify current page on vertical scroll)
   */
  maxTop: number;
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
   * Content info by number
   */
  contentsByOrder: Map<number, FixedViewerContentInfo>;
  /**
   * Content info by label
   */
  contentsBySlug: Map<string, FixedViewerContentInfo>;
  /**
   * Contents info array
   */
  contentsInfo: FixedViewerContentInfo[];
  /**
   * Contents max width
   */
  maxWidth: number;
  /**
   * Contents max height
   */
  maxHeight: number;
  /**
   * Current content index (order, base 0)
   */
  currentContentIndex: number;
  /**
   * Viewer is loading content
   */
  loadingContent: boolean;
  /**
   * Loaded CSS URLs
   */
  loadedCssUrls: Set<string>;
  // loadedPages: string[];
  /**
   * Zoom Level
   */
  zoom: number;
  /**
   * Speed of the zoom changing when pinch
   * or ctl + scroll
   */
  zoomSpeed: number;
  /**
   * Maximum Zoom Value
   */
  maximumZoomValue: number;
  /**
   * Minimum Zoom Value
   */
  minimumZoomValue: number;
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
   * Flow content chapter number
   */
  chapterNumber: number;
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
  positionBySlug: Map<string, number>;
  /**
   * Map where positions are keys (left for horizontal, top for vertical) and labels are values
   */
  slugByPosition: Map<number, string>;
  /**
   * Last content position
   */
  lastPosition: number;
}

export type State = GlobalState &
  ((FixedState & (PaginatedState | ScrolledState)) | (FlowState & ScrolledState));

export type FullState = GlobalState &
  Omit<FlowState, 'layout'> &
  Omit<FixedState, 'layout'> & { layout: LayoutTypes } & Omit<PaginatedState, 'scrollMode'> &
  Omit<FlowState, 'scrollMode'> & { scrollMode: ScrollModes } & ScrolledState;

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
