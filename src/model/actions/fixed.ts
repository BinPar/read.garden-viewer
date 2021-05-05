import { Action } from "./common";

/**
 * Names of the action types for Fixed Layout Actions
 */
 export enum FixedActionTypes {
  SetSinglePageMode = 'setSinglePageMode',
}

/**
 * Set the Single Page Mode (not scroll mode)
 */
 export interface SetSinglePageMode extends Action {
  type: FixedActionTypes.SetSinglePageMode;
}

/**
 * Actions for FixedLayout
 */
export type FixedActions = SetSinglePageMode;