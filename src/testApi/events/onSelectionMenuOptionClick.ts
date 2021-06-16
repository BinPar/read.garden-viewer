import log from 'loglevel';
import {
  ClearSelection,
  DrawHighlights,
  OnSelectionMenuOptionClick,
  RemoveSelectionMenu,
  ShowNotesDialog,
} from '../../model';
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
    if (highlighter.className === 'note') {
      const showNotesDialog: ShowNotesDialog = {
        type: 'showNotesDialog',
        key: highlighter.key,
        color: highlighter.color,
        title: highlighter.title,
      };
      await dispatch(showNotesDialog);
    } else {
      const key = `${highlighter.key}|${+new Date()}`;
      const drawAction: DrawHighlights = {
        type: 'drawHighlights',
        color: highlighter.color,
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
    const removeAction: RemoveSelectionMenu = {
      type: 'removeSelectionMenu',
    };
    await dispatch(removeAction);
  }
};

export default onSelectionMenuOptionClick;
