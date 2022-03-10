import log from 'loglevel';
import { PageChange } from '../../model/events';
import { EventHandler } from './eventHandler';

const pageChange: EventHandler<PageChange> = (event) => {
  log.info(`Page changed to ${event.label}`);
};

export default pageChange;
