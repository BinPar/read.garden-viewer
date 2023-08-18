import { PageChange } from '../../model/events';
import { EventHandler } from './eventHandler';

const pageChange: EventHandler<PageChange> = (event) => {
  console.info(`Page changed to ${event.label}`);
};

export default pageChange;
