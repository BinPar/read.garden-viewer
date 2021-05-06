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
 * Sets the Font Size of the flow layout
 */
export interface SetFontSize extends Action {
  type: 'setFontSize';
  /**
   * Size of the font to use (in EMs)
   */
  fontSize: number;
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
export interface SetDefaultTypography extends Action {
  type: 'setDefaultTypography';
  /**
   * Font family name to set (baskerville-enc, helvetica-enc, americanTypewriter-enc...)
   */
  fontFamily: string;
}

/**
 * Actions for FlowLayout
 */
export type FlowActions = SetFontSize | SetLineHeight | SetDefaultTypography;
