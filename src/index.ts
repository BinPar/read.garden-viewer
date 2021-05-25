import log from 'loglevel';
import { ViewerFunction } from './model/viewer';
import viewer from './viewer';

log.setLevel('info');

declare global {
  interface Window {
    readGardenViewer: ViewerFunction;
  }
  interface Selection {
    /**
     * Applies a change to the current selection or cursor position, using simple textual commands
     */
    modify: (
      /**
       * The type of change to apply. Specify `"move"` to move the current cursor position or
       * `"extend"` to extend the current selection.
       */
      alter: 'move' | 'extend',
      /**
       * The direction in which to adjust the current selection. You can specify `"forward"` or
       * `"backward"` to adjust in the appropriate direction based on the language at the
       * selection point. If you want to adjust in a specific direction, you can specify `"left"`
       * or `"right"`.
       */
      direction: 'forward' | 'backward' | 'left' | 'right',
      /**
       * The distance to adjust the current selection or cursor position. You can move by
       * `"character"`, `"word"`, `"sentence"`, `"line"`, `"paragraph"`, `"lineboundary"`,
       * `"sentenceboundary"`, `"paragraphboundary"`, or `"documentboundary"`.
       * > **Note**: Gecko does **not** implement `"sentence"`, `"paragraph"`,
       * `"sentenceboundary"`, `"paragraphboundary"`, or `"documentboundary"`. WebKit and Blink do.
       * >
       * > **Note**: Starting in Gecko 5.0, the `"word"` granularity no longer includes the
       * following space, regardless of the default platform behavior. This makes the behavior
       * more consistent, as well as making it work the same way WebKit used to work, but
       * unfortunately they have recently changed their behavior.
       */
      granularity:
        | 'character'
        | 'word'
        | 'sentence'
        | 'line'
        | 'paragraph'
        | 'lineboundary'
        | 'sentenceboundary'
        | 'paragraphboundary'
        | 'documentboundary',
    ) => void;
  }
}

if (typeof window !== 'undefined') {
  window.readGardenViewer = viewer;
}

export default viewer;

export { FixedContentInfo } from './model/state';
export { ReadGardenEventHandler } from './model/events';
