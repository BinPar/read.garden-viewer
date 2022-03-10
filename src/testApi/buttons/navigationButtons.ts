import { DispatchAPIAction } from '../../model/actions/common';
import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

import loadIndexFile from '../utils/loadIndexFile';
import contentSlugSelect from './contentSlugSelect';
import directionButtons from './directionButtons';
import flowChapterSelect from './flowChapterSelect';

const navigationButtons = (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): void => {
  loadIndexFile(state.config.slug).then((jsonIndex) => {
    if (state.layout === LayoutTypes.Flow) {
      flowChapterSelect(container, state, dispatcher, jsonIndex);
    }
    contentSlugSelect(container, state, dispatcher, jsonIndex);
    directionButtons(container, state, dispatcher);
  }).catch((ex) => {
    const { stack, message } = ex as Error;
    console.error('Error loading index file', stack || message);
  });
};

export default navigationButtons;
