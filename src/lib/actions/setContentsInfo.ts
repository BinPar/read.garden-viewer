import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetContentsInfo } from '../../model/actions/fixed';
import { LayoutTypes } from '../../model/viewerSettings';

import processFixedContents from '../../utils/processFixedContents';

/**
 * Sets contents info and setups needed DOM elements
 * @param context.state Viewer state
 * @param context.action Viewer action
 * @returns Partial state update
 */
const setContentsInfo: ActionDispatcher<SetContentsInfo> = async ({ state, action }) => {
  if (state.layout === LayoutTypes.Flow) {
    throw new Error('Action not allowed in flow mode');
  }
  return processFixedContents(action.info, state);
};

export default setContentsInfo;
