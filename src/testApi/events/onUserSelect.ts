import { ShowSelectionMenu } from '../../model/actions/global';
import { OnUserSelect } from '../../model/events';
import getHighlighters from '../utils/getHighlighters';
import { EventHandler } from './eventHandler';

const onUserSelect: EventHandler<OnUserSelect> = (event, dispatch) => {
  const action: ShowSelectionMenu = {
    type: 'showSelectionMenu',
    options: getHighlighters(),
  };
  dispatch(action);
};

export default onUserSelect;
