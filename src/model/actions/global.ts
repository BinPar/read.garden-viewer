import { Action, ScrollModes } from "./common";

/**
 * Names of the action types for global actions
 */
export type GlobalActionTypes = 'setScrollMode' | 'setDarkMode';

/**
 * Abstract interface for all Global Actions
 */
interface GlobalAction extends Action {
  type: GlobalActionTypes;
}

/**
 * Sets the horizontal or vertical mode
 */
 export interface SetScrollMode extends GlobalAction {
  type: 'setScrollMode';
  /**
   * Scroll mode to set
   */
  scrollMode: ScrollModes;
}

/**
 * Sets the Dark or Light Mode
 */
export interface SetDarkMode extends GlobalAction {
  type: 'setDarkMode';
  /**
   * True for dark mode
   */
  isDark: Boolean;
}

/**
 * Actions that affect Fixed and Flow Layout
 */
export type GlobalActions = SetScrollMode;