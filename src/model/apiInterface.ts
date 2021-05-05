import { Actions } from "./actions";
import { State } from "./state";

export type DispatchAPIAction = (action: Actions) => Promise<void>;

export interface APIInterface {
  dispatch: DispatchAPIAction;
  state: State;
}
