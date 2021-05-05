import { Action, ScrollModes } from "./common";

/**
 * Names of the action types for global actions
 */
export enum GlobalActionTypes {
  SetScrollMode = 'setScrollMode',
  SetDarkMode = 'setDarkMode',
}

/**
 * Sets the horizontal or vertical mode
 */
 export interface SetScrollMode extends Action {
  type: GlobalActionTypes.SetScrollMode;
  /**
   * Scroll mode to set
   */
  scrollMode: ScrollModes;
}

/**
 * Sets the Dark or Light Mode
 */
export interface SetDarkMode extends Action {
  type: GlobalActionTypes.SetDarkMode;
  /**
   * True for dark mode
   */
  isDark: Boolean;
}

/**
 * Actions that affect Fixed and Flow Layout
 */
export type GlobalActions = SetScrollMode;