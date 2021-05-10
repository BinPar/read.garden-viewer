import { Action } from './common';

/**
 * Names of the action types for Flow Layout Actions
 */
export enum FlowActionTypes {
  SetFontSize = 'setFontSize',
  SetLineHeight = 'setLineHeight',
  SetDefaultTypography = 'setDefaultTypography',
}

/**
 * Sets the font size of the flow layout
 */
export interface SetFontSize extends Action {
  type: 'setFontSize';
  /**
   * Desired new font size
   */
  size: number;
}

/**
 * Increases the font size by the defined step
 */
export interface IncreaseFontSize extends Action {
  type: 'increaseFontSize';
}

/**
 * Decreases the font size by the defined step
 */
export interface DecreaseFontSize extends Action {
  type: 'decreaseFontSize';
}

/**
 * Sets the line height of the text
 */
export interface SetLineHeight extends Action {
  type: 'setLineHeight';
  /**
   * Line Height (in EMs)
   */
  lineHeight: number;
}

/**
 * Sets the default typography for the text
 */
export interface SetFontFamily extends Action {
  type: 'setFontFamily';
  /**
   * Desired new font family (baskerville-enc, helvetica-enc, americanTypewriter-enc...)
   */
  fontFamily: string;
}

/**
 * Actions for FlowLayout
 */
export type FlowActions =
  | SetFontSize
  | IncreaseFontSize
  | DecreaseFontSize
  | SetLineHeight
  | SetFontFamily;
