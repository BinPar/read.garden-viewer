import { FixedActions, FixedActionTypes } from "./fixed";
import { FlowActions, FlowActionTypes } from "./flow";
import { GlobalActions, GlobalActionTypes } from "./global";

/**
 * All the actions that are available for the viewer
 */
export type Actions = GlobalActions | FixedActions | FlowActions;

/**
 * All the action names are available for the viewer
 */
export const actionTypeNames = {
  global: Object.values(GlobalActionTypes),
  flow: Object.values(FlowActionTypes),
  fixed: Object.values(FixedActionTypes),
};
