import { Action } from './common';
import { FixedContentInfo } from '../state';

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
  type: 'setSinglePageMode';
}

/**
 * Set fixed contents info
 */
export interface SetContentsInfo extends Action {
  type: 'setContentsInfo';
  /**
   * Info for every content
   */
  info: FixedContentInfo[];
}

/**
 * Actions for FixedLayout
 */
export type FixedActions = SetSinglePageMode | SetContentsInfo;
