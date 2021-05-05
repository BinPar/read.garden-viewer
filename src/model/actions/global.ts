import { ScrollModes } from '../state';
import { Action } from './common';

/**
 * Names of the action types for global actions
 */
export enum GlobalActionTypes {
  SetScrollMode = 'setScrollMode',
  SetDarkMode = 'setDarkMode',
  NavigateToPage = 'navigateToPage',
  SetDebugViewerSafeArea = 'setDebugViewerSafeArea',
}

/**
 * Enables the draw of red border around the viewer
 */
export interface SetDebugViewerSafeArea extends Action {
  type: 'setDebugViewerSafeArea';
  /**
   * True for debug mode (red border)
   */
  value: boolean;
}

/**
 * Sets the horizontal or vertical mode
 */
export interface SetScrollMode extends Action {
  type: 'setScrollMode';
  /**
   * Scroll mode to set
   */
  scrollMode: ScrollModes;
}

/**
 * Sets the Dark or Light Mode
 */
export interface SetDarkMode extends Action {
  type: 'setDarkMode';
  /**
   * True for dark mode
   */
  isDark: Boolean;
}

/**
 * Navigates to any specific page
 */
export interface NavigateToPage extends Action {
  type: 'navigateToPage';
  /**
   * Page label of the page that we want to go to
   */
  pageLabel: string;
}

/**
 * Actions that affect Fixed and Flow Layout
 */
export type GlobalActions =
  | SetScrollMode
  | SetDarkMode
  | NavigateToPage
  | SetDebugViewerSafeArea;
