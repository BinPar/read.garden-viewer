import { Config } from './config';
import { FitMode, Margin } from './viewer';

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

export enum Actions {
  ToggleReadMode = 'toggleReadMode',
}

export type Action = | { type: Actions.ToggleReadMode };