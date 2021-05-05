/**
 * Abstract action interface
 */
export interface Action {
  /**
   * Action type discriminator
   */
  type: string;
}

/**
 * Available scroll modes
 */
export type ScrollModes = 'vertical' | 'horizontal';
