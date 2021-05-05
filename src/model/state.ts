import { Config } from './config';
import { FitMode, Margin, Zoom } from './viewer';

export interface State {
  margin: Margin;
  /**
   * Fit mode (width/height/none)
   */
  fitMode?: FitMode;
  readMode?: boolean;
  /**
   * Current scale value (`1` based like CSS property)
   */
  currentScale: number;
}

export interface StateWithConfig extends State {
  /**
   * Viewer config
   */
  config: Config;
}

export interface GlobalState {
  title: string;
}

export interface FixedState {
  layout: 'fixed';
  zoom: Zoom;
  loadedPages: string[];
}

export interface FlowState {
  layout: 'flow';
  fontSize: number;
}

export interface PaginatedState {
  scrollMode: 'fixed';
}

export interface ScrolledState {
  scrollMode: 'vertical' | 'horizontal';
  scrollPosition: number;
  maxScroll: number;
  pageSeparations: boolean;
}

export type AppState = GlobalState &
  (
    | (FixedState & (PaginatedState | ScrolledState))
    | (FlowState & ScrolledState)
  );
