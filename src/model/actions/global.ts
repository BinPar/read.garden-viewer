import { LayoutTypes, ScrollModes, State } from '../state';
import { Action } from './common';

type FilterPropertyNames<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
type AllowedPropertyNamesNames<Base, Condition> = FilterPropertyNames<Base, Condition>[keyof Base];

export type StatePropertyNames<T> = AllowedPropertyNamesNames<State, T>;

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
 export interface AppendNewContent extends Action {
  type: 'appendNewContent';
  /**
   * Layout type
   */
  layout: LayoutTypes;
  /**
   * First level content slug (book, work...)
   */
  slug: string;
  /**
   * Second level content slug (page, chapter...)
   */
  contentSlug: string;
  /**
   * Second level content label (page, chapter...)
   */
  label: string;
  /**
   * Content CSS URL
   */
  cssURL: string;
  /**
   * Content HTML
   */
  htmlContent: string;
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


/**
 * Actions that affect Fixed and Flow Layout
 */
export type GlobalActions =
  | SetScrollMode
  | SetDarkMode
  | NavigateToPage
  | SetDebugViewerSafeArea
  | AppendNewContent
  | Resize
  | HighlightSearchTerms
  | SetReadMode
  | AddOnChangeEvent<any>
  | RemoveOnChangeEvent<any>;
