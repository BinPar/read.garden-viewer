import log from 'loglevel';
import { AppendNewContent } from '../../model/actions/global';
import { LoadNewContent } from '../../model/events';
import loadIndexFile from '../utils/loadIndexFile';
import { EventHandler } from './eventHandler';
import testingConfig from '../../config/testing';

const loadNewContent: EventHandler<LoadNewContent> = async (
  event,
  dispatch,
) => {
  const index = await loadIndexFile(event.contentSlug);
  const currentPageLabel = event.label || index.initialContentSlug;
  const currentContent = index.contents.find((content) =>
    content.labels.includes(currentPageLabel),
  );
  if (!currentContent) {
    log.error(
      `No label "${event.label}" found in content "${index.initialContentSlug}"`,
    );
  } else {
    const url = `${testingConfig.baseURL}books/${event.contentSlug}/${currentContent.file}`;
    const response = await fetch(url);
    const htmlContent = await response.text();
    const action: AppendNewContent = {
      type: 'appendNewContent',
      cssURL: currentContent.cssUrl,
      htmlContent,
    };
    dispatch(action);
  }
};

export default loadNewContent;
