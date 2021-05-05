import { Action } from "./common";

/**
 * Names of the action types for Flow Layout Actions
 */
 export enum FlowActionTypes {
  SetFontSize = 'setFontSize',
}

/**
 * Sets the Font Size of the flow layout
 */
 export interface SetFontSize extends Action {
  type: FlowActionTypes.SetFontSize;
  /**
   * Size of the font to use (in EMs)
   */
  fontSize: number;
}

/**
 * Actions for FlowLayout
 */
export type FlowActions = SetFontSize;
