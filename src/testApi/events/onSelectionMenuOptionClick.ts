import log from 'loglevel';
import { ClearSelection, DrawHighlights, OnSelectionMenuOptionClick } from '../../model';
import getHighlighters from '../utils/getHighlighters';
import { EventHandler } from './eventHandler';

const onSelectionMenuOptionClick: EventHandler<OnSelectionMenuOptionClick> = async (
  event,
  dispatch,
) => {
  const highlighters = getHighlighters();
  const highlighter = highlighters.find((hl) => hl.key === event.key)!;
  if (event.highlightKey) {
    log.info('Option clicked on highlight (editing)', { event });
  } else {
    const key = `${highlighter.key}|${+new Date()}`;
    const drawAction: DrawHighlights = {
      type: 'drawHighlights',
      color: `${highlighter.color}`,
      key: event.key,
      highlights: [event.selectionInfo!].map((i) => ({
        ...i,
        key,
      })),
    };
    await dispatch(drawAction);
    const clearAction: ClearSelection = {
      type: 'clearSelection',
    };
    await dispatch(clearAction);
  }
};

export default onSelectionMenuOptionClick;
