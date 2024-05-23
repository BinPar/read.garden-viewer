import { AddOnChangeEvent, AppendNewContent } from '../model/actions/global';
import { DispatchAPIAction } from '../model/actions/common';
import { LoadNewContent } from '../model/events';
import { State } from '../model/state';
import { LayoutTypes } from '../model/viewerSettings';

import loadContentsInBackground from './loadContentsInBackground';
import layoutSetup from '../viewer/layoutSetup';
import redrawUserHighlights from './highlights/redrawUserHighlights';

const setupHandlers = async (state: State, dispatch: DispatchAPIAction): Promise<void> => {
  if (state.config.initialContent?.htmlContent) {
    const action: AppendNewContent = {
      type: 'appendNewContent',
      ...state.config.initialContent,
    };
    await dispatch(action);
  } else if (state.config.eventHandler && state.layout === LayoutTypes.Flow) {
    const loadNewContent: LoadNewContent = {
      type: 'loadNewContent',
      slug: state.config.slug,
      productSlug: state.productSlug,
      contentSlug: state.config.contentSlug,
    };
    state.config.eventHandler(loadNewContent).catch((ex) => {
      const { stack, message } = ex as Error;
      console.error('Error at event handler', stack || message);
    });
  } else if (state.layout === LayoutTypes.Fixed) {
    layoutSetup(state);
  }
  if (state.layout === LayoutTypes.Fixed) {
    const onPageChange: AddOnChangeEvent<string> = {
      type: 'addOnChangeEvent',
      propertyName: 'contentSlug',
      event: () => {
        loadContentsInBackground(state);
        redrawUserHighlights(state).catch((ex) => {
          const { stack, message } = ex as Error;
          console.error('Error redrawing user highlights', stack || message);
        });
      },
    };
    await dispatch(onPageChange);
  }
};

export default setupHandlers;
