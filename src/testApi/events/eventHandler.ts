import { DispatchAPIAction } from '../../model/actions/common';
import { ReadGardenEvents } from '../../model/events';

export type EventHandler<T extends ReadGardenEvents> = (
  event: T,
  dispatcher: DispatchAPIAction,
) => Promise<void> | void;
