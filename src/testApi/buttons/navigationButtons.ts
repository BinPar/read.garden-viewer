import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

import loadIndexFile from '../utils/loadIndexFile';
import contentSlugSelect from './contentSlugSelect';
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
  });
};

export default navigationButtons;
