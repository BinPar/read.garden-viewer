import { DispatchAPIAction } from './actions/common';
import { InitialConfig } from "./config";
import { State } from './state';

export interface APIInterface {
  dispatch: DispatchAPIAction;
  state: State;
  unmount: () => void;
}

export type ViewerFunction = (config: InitialConfig) => APIInterface;
