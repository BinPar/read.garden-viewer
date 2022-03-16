import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { SetGapMode } from '../../model/actions/fixed';
import { FixedState, State } from '../../model/state';
import processFixedContents from '../../utils/processFixedContents';
import setCSSProperty from '../../utils/setCSSProperty';
import recalculateCurrentPage from '../animation/recalculateCurrentPage';
import { updateState } from '../state';

const setGapMode: ActionDispatcher<SetGapMode> = async ({
  action: { gapMode },
  state,
  // eslint-disable-next-line @typescript-eslint/require-await
}): Promise<Partial<State>> =>
  new Promise((resolve) => {
    setCSSProperty('viewer-margin-top', '200vh');
    updateState({ gapMode, avoidReset: true });
    const { contentSlug } = state;
    processFixedContents((state as FixedState).fixedInfo, state)
      .then((partialUpdate) => {
        const content = (partialUpdate as FixedState).contentsBySlug.get(contentSlug)!;
        updateState(partialUpdate);
        const scroll = state.scrollMode === 'horizontal' ? content.left : content.top;
        resolve({
          avoidReset: false,
          forceScroll: scroll,
        });
        recalculateCurrentPage(state, scroll, true);
        setCSSProperty('viewer-margin-top', '0');
      })
      .catch((ex) => {
        const { stack, message } = ex as Error;
        console.error('Error processing fixed contents', stack || message);
      });
  });

export default setGapMode;
