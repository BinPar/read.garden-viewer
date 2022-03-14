import { ShowSelectionMenu } from '../../model/actions/global';
import { OnUserSelect } from '../../model/events';
import getHighlighters from '../utils/getHighlighters';
import { EventHandler } from './eventHandler';

const onUserSelect: EventHandler<OnUserSelect> = async (event, dispatch) => {
  const action: ShowSelectionMenu = {
    type: 'showSelectionMenu',
    options: getHighlighters(),
    copyOption: {
      title: 'Copiar',
    },
  };
  await dispatch(action);
};

export default onUserSelect;
