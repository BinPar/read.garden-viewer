import { OnCopyOptionClick } from '../../model/events';
import { EventHandler } from './eventHandler';

const onCopyOptionClick: EventHandler<OnCopyOptionClick> = (event) => {
  console.log('Copying text:', { event });
};

export default onCopyOptionClick;
