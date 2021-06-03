import { AddOnChangeEvent, AppendNewContent } from '../model/actions/global';
import { DispatchAPIAction } from '../model/apiInterface';
import { LoadNewContent } from '../model/events';
import { State } from '../model/state';
import { LayoutTypes } from '../model/viewerSettings';
import loadContentsInBackground from './loadContentsInBackground';

const setupHandlers = async (state: State, dispatch: DispatchAPIAction): Promise<void> => {
  if (state.config.initialContent) {
    const action: AppendNewContent = {
      type: 'appendNewContent',
      ...state.config.initialContent,
    };
    await dispatch(action);
  } else if (state.config.eventHandler) {
    const loadNewContent: LoadNewContent = {
      type: 'loadNewContent',
      slug: state.config.slug,
      contentSlug: state.config.contentSlug,
    };
    state.config.eventHandler(loadNewContent);
  }
  if (state.layout === LayoutTypes.Fixed) {
    const onPageChange: AddOnChangeEvent<string> = {
      type: 'addOnChangeEvent',
      propertyName: 'contentSlug',
      event: loadContentsInBackground,
    };
    await dispatch(onPageChange);
  }
};

export default setupHandlers;
