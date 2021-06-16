import log from 'loglevel';
import { DispatchAPIAction } from '../model/actions/common';
import { ReadGardenEventHandler, ReadGardenEvents } from '../model/events';
import { State } from '../model/state';
import setupButtonBar from './buttons/setupButtonBar';
import events from './events';
import { EventHandler } from './events/eventHandler';

let dispatcher: DispatchAPIAction;
let state: State;
log.setLevel('info');

export const getState = (): State => state;

export const setState = (newState: State): void => {
  state = newState;
  setupButtonBar(state, dispatcher);
};

export const setDispatcher = (newDispatcher: DispatchAPIAction): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatcher = newDispatcher;
};

export const eventHandler: ReadGardenEventHandler = (event) =>
  new Promise<void>((resolve) => {
    if (dispatcher) {
      const eventReference = (
        events as {
          [key: string]: EventHandler<ReadGardenEvents>;
        }
      )[event.type];
      if (!eventReference) {
        log.warn(`Event not implemented ${event.type}`);
      } else {
        const promise = eventReference(event, dispatcher);
        if (promise) {
          promise.then(resolve);
        }
      }
    } else {
      setTimeout(() => eventHandler(event).then(resolve), 0);
    }
  });

declare global {
  interface Window {
    readGardenSetDispatcher: (newDispatcher: DispatchAPIAction) => void;
    readGardenEventHandler: ReadGardenEventHandler;
    readGardenSetState: (newState: State) => void;
  }
}

window.readGardenSetDispatcher = setDispatcher;
window.readGardenEventHandler = eventHandler;
window.readGardenSetState = setState;
