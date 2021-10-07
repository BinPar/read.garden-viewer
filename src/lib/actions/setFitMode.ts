import { FixedState, GlobalState, LayoutTypes } from '../../model';
import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetFitMode } from '../../model/actions/fixed';

import getScrollFromContentSlug from '../animation/getScrollFromContentSlug';

const setFitMode: ActionDispatcher<SetFitMode> = async ({ action: { fitMode, center }, state }) => {
  if (state.layout === LayoutTypes.Fixed) {
    const partialState: Partial<FixedState & GlobalState> = { fitMode };
    if (center) {
      partialState.forceScroll = -(getScrollFromContentSlug(state) ?? 0);
    }
    return partialState;
  }
  return {};
};

export default setFitMode;
