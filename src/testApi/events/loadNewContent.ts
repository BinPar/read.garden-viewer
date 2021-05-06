import log from 'loglevel';
import { AppendNewContent } from '../../model/actions/global';
import { LoadNewContent } from '../../model/events';
import loadIndexFile from '../utils/loadIndexFile';
import { EventHandler } from './eventHandler';
import testingConfig from '../../config/testing';
import { ContentType } from '../model/content';

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
    let htmlContent = await response.text();
    if (index.type === ContentType.flow) {
      const chapterNumber = parseInt(currentContent.cssUrl!.split('/')[1]!, 10);
      htmlContent = htmlContent.replace('<div', `<div class="c${chapterNumber + 1}"`);
    }
    const action: AppendNewContent = {
      type: 'appendNewContent',
      cssURL: `${testingConfig.baseURL}books/${event.contentSlug}/${currentContent.cssUrl}`,
      htmlContent,
    };
    dispatch(action);
  }
};

export default loadNewContent;
