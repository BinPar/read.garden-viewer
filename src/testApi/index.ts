import log from 'loglevel';
import { DispatchAPIAction } from '../model/apiInterface';
import { ReadGardenEventHandler, ReadGardenEvents } from '../model/events';
import { State } from '../model/state';
import setupButtonBar from './buttons/setupButtonBar';
import events from './events';
import { EventHandler } from './events/eventHandler';

let dispatcher: DispatchAPIAction;
let state: State;
log.setLevel('info');

export const setState = (newState: State): void => {
  state = newState;
  setupButtonBar(state, dispatcher);
};

export const setDispatcher = (newDispatcher: DispatchAPIAction): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatcher = newDispatcher;
};

export const eventHandler: ReadGardenEventHandler = async (event) => {
  const eventReference = (events as {
    [key: string]: EventHandler<ReadGardenEvents>;
  })[event.type];
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
    setState: (newState: State) => void;
  }
}

window.setDispatcher = setDispatcher;
window.setState = setState;
window.eventHandler = eventHandler;
