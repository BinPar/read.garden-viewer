import log from 'loglevel';
import { DispatchAPIAction } from '../model/apiInterface';
import { ReadGardenEventHandler, ReadGardenEvents } from '../model/events';
import events from './events';
import { EventHandler } from './events/eventHandler';

let dispatcher: DispatchAPIAction;
log.setLevel('info');

export const setDispatcher = (newDispatcher: DispatchAPIAction): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatcher = newDispatcher;
};

export const eventHandler: ReadGardenEventHandler = async (event) => {
  const eventReference = (events as {[key: string]: EventHandler<ReadGardenEvents>})[event.type];
  if (!eventReference) {
    log.warn(`Event not implemented ${event.type}`);
  } else {
    eventReference(event, dispatcher);
  }
};

declare global {
  interface Window {
    setDispatcher: (newDispatcher: DispatchAPIAction) => void;
    eventHandler: ReadGardenEventHandler;
  }
}

window.setDispatcher = setDispatcher;
window.eventHandler = eventHandler;
