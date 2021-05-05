import { FixedActions, FixedActionTypes } from "./fixed";
import { FlowActions, FlowActionTypes } from "./flow";
import { GlobalActions, GlobalActionTypes } from "./global";

/**
 * All the actions that are available for the viewer
 */
export type Actions = GlobalActions | FixedActions | FlowActions;

/**
 * All the action types that are available for the viewer
 */
export type ActionTypes = GlobalActionTypes | FixedActionTypes | FlowActionTypes;
