import { ShowSelectionMenu } from '../../model/actions/global';
import { OnHighlightClick } from '../../model/events';
import getHighlighters from '../utils/getHighlighters';
import { EventHandler } from './eventHandler';

const onHighlightClick: EventHandler<OnHighlightClick> = async (event, dispatch) => {
  const highlighters = getHighlighters();
  const highlighterId = event.key.split('|').shift();
  const action: ShowSelectionMenu = {
    type: 'showSelectionMenu',
    key: event.key,
    options: highlighters.map((hl) => ({
      ...hl,
      selected: hl.key === highlighterId,
    })),
    deleteOption: {
      title: 'Eliminar',
    },
  };
  await dispatch(action);
};

export default onHighlightClick;
