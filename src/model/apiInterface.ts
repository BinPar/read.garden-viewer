import { Action } from "./actions/common";
import { State } from "./state";

export type DispatchAPIAction = (action: Action) => Promise<void>;

export interface APIInterface {
  dispatch: DispatchAPIAction;
  state: State;
  unmount: () => void;
}
