import { Actions } from ".";
import { State } from "../state";

export type ActionDispatcher<T extends Actions> = (action: T, state: State) => Promise<Partial<State>>;
