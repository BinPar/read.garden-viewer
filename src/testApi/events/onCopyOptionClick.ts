import { OnCopyOptionClick } from '../../model/events';
import { EventHandler } from './eventHandler';

const onCopyOptionClick: EventHandler<OnCopyOptionClick> = (event) => {
  // eslint-disable-next-line no-console
  console.info('Copying text:', { event });
};

export default onCopyOptionClick;
