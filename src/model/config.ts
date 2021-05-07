import { ReadGardenEventHandler } from './events';
import { FitMode, FontSize, Margin, ViewerMode, Zoom } from './viewerSettings';

/*
SCOPES:
- [GLobal]: all viewers.
- [Fixed]: fixed contents viewer. Scrolled and Paginated.
- [Scrolled]: Scrolled viewer.
- [Paginated]: Paginated viewer.
- [Flow]: Flow viewer.
*/

export type LayoutType = 'fixed' | 'flow';

export interface DefaultConfig {
  /**
   * Will be the viewer mode when first displaying a content fixed book (PDF, EPUB 3 Fixed, etc)
   * and got no viewer mode set in user settings
   * @scope Fixed
   */
  initialFixedMode: ViewerMode.WithScroll | ViewerMode.Paginated;
  /**
   * Initial fit mode. Will be used at viewer first load.
   * @scope Fixed
   */
  initialFitMode: FitMode;
  /**
   * Initial scale. Will be ignored if `initialFitMode` is set. Will be used at viewer first load.
   * @scope Fixed
   */
  initialScale: number;
  /**
   * Initial font size (if it's no defined user settings)
   * @scope Flow
   */
  initialFontSize: number;
  /**
   * Initial read mode for first render
   * @scope Global
   */
  initialReadMode: boolean;
  /**
   * Zoom config
   * @scope Fixed
   */
  zoom: Zoom;
  /**
   * Font size config
   * @scope Flow
   */
  fontSize: FontSize;
  /**
   * Viewer margins during `read mode`
   * @scope Global
   */
  readModeMargin: Margin;
  /**
   * Viewer margins during `UI mode`
   * @scope Global
   */
  uiModeMargin: Margin;
  /**
   * [Scrolled] Loaded contents number. Viewer will always try to keep this number of contents (pages)
   * loaded. If number of visible contents (pages) is bigger than this number, this number will
   * be ignored. Also, if number of total contents (pages) is lower than this number, this number
   * will be ignored.
   * @scope Scrolled
   */
  loadedContentsNumber: number;
  /**
   * Gap between columns (between one column's right text limit and next column left text limit).
   * @scope Flow
   */
  columnGap: number;
  /**
   * Threshold for scrolling to next/prev `page` (next/prev hidden column(s)), meaning percentage of
   * new column (left or right) that must be visible to assume user wants to move to next/prev page.
   * @scope Flow
   */
  pageChangeThreshold: number;
  /**
   * Threshold for navigating to next/prev `chapter`, meaning percentage of empty column at the
   * start/end of chapter that must be visible to assume user wants to navigate to another chapter.
   * @scope Flow
   */
  chapterChangeThreshold: number;
  /**
   * Minimum characters per column. When chars per column go below this number, flow viewer will
   * @scope Flow
   * force single column mode, avoiding too narrow columns in two columns mode.
   */
  minCharsPerColumn: number;
  /**
   * Maximum characters per column. When chars per column go above this number, flow viewer
   * prevents column to grow wider and increases column gap instead.
   * @scope Flow
   */
  maxCharsPerColumn: number;
  /**
   * If `true`, viewer will display a separation between pages
   */
  showPageSeparation: boolean;
  /**
   * Debug viewer safe area flag
   */
  debugViewerSafeArea: boolean;
}

export interface RequiredConfig {
  /**
   * Layout type of the content to display
   */
  layoutType: LayoutType;
  /**
   * Event handler to process the Viewer Events
   */
  eventHandler?: ReadGardenEventHandler;
  /**
   * Current content slug
   */
  contentSlug: string;
  /**
   * Label of the initial page or null to use the default page
   */
  startPageLabel: string | null;
  /**
   * Initial font family
   */
  initialFontFamily: string;
}

export type Config = DefaultConfig & RequiredConfig;

export type InitialConfig = Partial<Config> & RequiredConfig;
