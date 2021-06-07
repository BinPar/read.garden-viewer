import { FullState } from '../state';
import { NewContent, ScrollModes, SelectionOption, SelectionRange, ViewerTheme } from '../viewerSettings';
import { Action } from './common';

type FilterPropertyNames<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
type AllowedPropertyNamesNames<Base, Condition> = FilterPropertyNames<Base, Condition>[keyof Base];

export type StatePropertyNames<T> = AllowedPropertyNamesNames<FullState, T>;

/**
 * Names of the action types for global actions
 */
export enum GlobalActionTypes {
  SetScrollMode = 'setScrollMode',
  SetDarkMode = 'setDarkMode',
  NavigateToPage = 'navigateToPage',
  SetDebugViewerSafeArea = 'setDebugViewerSafeArea',
  AppendNewContent = 'appendNewContent',
  Resize = 'resize',
  HighlightSearchTerms = 'highlightSearchTerms',
}

/**
 * Appends new loaded content
 */
 export interface AppendNewContent extends Action, NewContent {
  type: 'appendNewContent';
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
export interface SetTheme extends Action {
  type: 'setTheme';
  /**
   * Viewer theme (light, dark...)
   */
  theme: ViewerTheme;
}

/**
 * Navigates to any specific page
 */
export interface NavigateToPage extends Action {
  type: 'navigateToPage';
  /**
   * Content slug of the page that we want to go to
   */
  contentSlug: string;
}

export interface Resize extends Action {
  type: 'resize';
}

export type PropertyChangeEvent<T = any> = (newValue: T, oldValue: T) => void;

export interface AddOnChangeEvent<T> extends Action {
  type: 'addOnChangeEvent';
  propertyName: StatePropertyNames<T>;
  event: PropertyChangeEvent<T>; 
}

export interface RemoveOnChangeEvent<T> extends Action {
  type: 'removeOnChangeEvent';
  propertyName: StatePropertyNames<T>;
  event: PropertyChangeEvent<T>; 
}

export interface RemoveAllChangeEvents extends Action {
  type: 'removeAllChangeEvents';
}

export interface HighlightSearchTerms extends Action {
  type: 'highlightSearchTerms';
  /**
   * Terms to highlight
   */
  terms: string[];
}

export interface SetReadMode extends Action {
  type: 'setReadMode';
  /**
   * True for read mode and false for ui mode
   */
  readModeActive: boolean;
}

export interface ShowSelectionMenu extends Action {
  type: 'showSelectionMenu';
  options: SelectionOption[];
}

export interface ClearSelection extends Action {
  type: 'clearSelection';
}

export interface DrawHighlights extends Action {
  type: 'drawHighlights';
  highlighterKey: string;
  color: string;
  highlights: SelectionRange[];
  clear?: boolean;
}

/**
 * Actions that affect Fixed and Flow Layout
 */
export type GlobalActions =
  | SetScrollMode
  | SetTheme
  | NavigateToPage
  | SetDebugViewerSafeArea
  | AppendNewContent
  | Resize
  | HighlightSearchTerms
  | SetReadMode
  | AddOnChangeEvent<any>
  | RemoveOnChangeEvent<any>
  | RemoveAllChangeEvents
  | ShowSelectionMenu
  | ClearSelection
  | DrawHighlights;
