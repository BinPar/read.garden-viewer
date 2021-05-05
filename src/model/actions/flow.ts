import { Action } from "./common";

/**
 * Names of the action types for Flow Layout Actions
 */
export type FlowActionTypes = 'setFontSize';

/**
 * Abstract interface for all Flow Layout Actions
 */
interface FlowAction extends Action {
  type: FlowActionTypes;
}

/**
 * Sets the Font Size of the flow layout
 */
 export interface SetFontSize extends FlowAction {
  type: 'setFontSize';
  /**
   * Size of the font to use (in EMs)
   */
  fontSize: number;
}

/**
 * Actions for FlowLayout
 */
export type FlowActions = FlowAction;
