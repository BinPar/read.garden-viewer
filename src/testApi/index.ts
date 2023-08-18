import { DispatchAPIAction } from '../model/actions/common';
import { ReadGardenEventHandler, ReadGardenEvents } from '../model/events';
import { State } from '../model/state';
import setupButtonBar from './buttons/setupButtonBar';
import events from './events';
import { EventHandler } from './events/eventHandler';

let dispatcher: DispatchAPIAction;
let state: State;

export const getState = (): State => state;

export const setState = (newState: State): void => {
  state = newState;
  setupButtonBar(state, dispatcher).catch((ex) => {
    const { stack, message } = ex as Error;
    console.error('Error in setup button bar', stack || message);
  });
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
        console.warn(`Event not implemented ${event.type}`);
      } else {
        const promise = eventReference(event, dispatcher);
        if (promise) {
          promise.then(resolve).catch((ex) => {
            const { stack, message } = ex as Error;
            console.error('Error at event handler promise', stack || message);
          });
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
