import log from 'loglevel';
import { State } from '../../model/state';

type FilterPropertyNames<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
type AllowedPropertyNamesNames<Base, Condition> = FilterPropertyNames<Base, Condition>[keyof Base];

export type StatePropertyNames<T> = AllowedPropertyNamesNames<State, T>;

export type PropertyChangeEvent<T = any> = (newValue: T, oldValue: T) => void;

const handlers = new Map<string, PropertyChangeEvent[]>();

/**
 * Adds event listener handler to be called when a specific state property changes
 * @param propertyName Name of the property to watch for changes
 * @param event Event handler to launch on change
 */
export const addOnChangeEventListener = <T>(
  propertyName: StatePropertyNames<T>,
  event: PropertyChangeEvent<T>,
): void => {
  let eventList: PropertyChangeEvent<T>[];
  const key = propertyName as string;
  if (!handlers.has(key)) {
    eventList = new Array<PropertyChangeEvent<T>>();
    handlers.set(key, eventList);
  } else {
    eventList = handlers.get(key) as PropertyChangeEvent<T>[];
  }
  if (!eventList.includes(event)) {
    eventList.push(event);
  }
};

/**
 * Removes event listener handler to stop notifying event
 * @param propertyName Name of the property
 * @param event Event handler
 */
export const removeOnChangeEventListener = <T>(
  propertyName: StatePropertyNames<T>,
  event: PropertyChangeEvent<T>,
): void => {
  const key = propertyName as string;
  if (handlers.has(key)) {
    const eventList = handlers.get(key) as PropertyChangeEvent<T>[];
    const eventIndex = eventList.indexOf(event);
    if (eventIndex !== -1) {
      eventList.splice(eventIndex, 1);
    }
  }
};

/**
 * Notifies when a property is changed
 * @param propertyName property that is changed
 * @param newValue new property value
 * @param oldValue old property value
 */
export const notifyEventHandler = <T>(
  propertyName: StatePropertyNames<T>,
  newValue: T,
  oldValue: T,
): void => {
  const key = propertyName as string;
  if (handlers.has(key)) {
    const eventList = handlers.get(key) as PropertyChangeEvent<T>[];
    eventList.forEach((handler) => {
      try {
        handler(newValue, oldValue);
      } catch (error) {
        log.error(error);
      }
    });
  }
};
