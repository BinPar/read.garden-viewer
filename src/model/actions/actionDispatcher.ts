import { Actions } from '.';
import { State } from '../state';

export interface DispatcherContext<T> {
  state: State;
  action: T;
}

export type ActionDispatcher<T extends Actions> = (
  context: DispatcherContext<T>,
) => Promise<Partial<State>>;
