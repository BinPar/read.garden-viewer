import log from 'loglevel';
import { LoadNewContent } from '../../model/events';
import { EventHandler } from './eventHandler';

const loadNewContent: EventHandler<LoadNewContent> = async (event) => {
  log.info(`Loading content ${event.label}`);
};

export default loadNewContent;
