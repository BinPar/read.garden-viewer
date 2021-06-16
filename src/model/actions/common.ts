/**
 * Abstract action interface
 */
export interface Action {
  /**
   * Action type discriminator
   */
  type: string;
}

export type DispatchAPIAction = (action: Action) => Promise<void>;