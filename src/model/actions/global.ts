import { ScrollModes } from "../state";
import { Action } from "./common";

/**
 * Names of the action types for global actions
 */
export enum GlobalActionTypes {
  SetScrollMode = 'setScrollMode',
  SetDarkMode = 'setDarkMode',
  NavigateToPage = 'navigateToPage',
}

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
  type: GlobalActionTypes.SetScrollMode;
  /**
   * Scroll mode to set
   */
  scrollMode: ScrollModes;
}

/**
 * Sets the Dark or Light Mode
 */
export interface SetDarkMode extends GlobalAction {
  type: GlobalActionTypes.SetDarkMode;
  /**
   * True for dark mode
   */
  isDark: Boolean;
}

/**
 * Navigates to any specific page
 */
export interface NavigateToPage extends GlobalAction {
  type: GlobalActionTypes.NavigateToPage;
  /**
   * Page label of the page that we want to go to
   */
  pageLabel: string;
}

/**
 * Actions that affect Fixed and Flow Layout
 */
export type GlobalActions = SetScrollMode | SetDarkMode | NavigateToPage;
