import { Action } from "./common";

/**
 * Names of the action types for Fixed Layout Actions
 */
export type FixedActionTypes = 'setSinglePageMode';

/**
 * Abstract interface for all Fixed Layout Actions
 */
interface FixedAction extends Action {
  type: FixedActionTypes;
}

/**
 * Set the Single Page Mode (not scroll mode)
 */
 export interface SetSinglePageMode extends FixedAction {
  type: 'setSinglePageMode';
}

/**
 * Actions for FixedLayout
 */
export type FixedActions = SetSinglePageMode;