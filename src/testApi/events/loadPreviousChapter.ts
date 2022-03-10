import log from 'loglevel';
import testingConfig from '../../config/testing';
import { AppendNewContent } from '../../model/actions/global';

import { LoadPreviousChapter } from '../../model/events';
import { LayoutTypes } from '../../model/viewerSettings';
import loadIndexFile from '../utils/loadIndexFile';
import { EventHandler } from './eventHandler';

const loadPreviousChapter: EventHandler<LoadPreviousChapter> = async (event, dispatch) => {
  const { slug, currentContentSlug } = event;
  const index = await loadIndexFile(slug);
  const { type: layout, contents } = index;
  if (layout === LayoutTypes.Fixed) {
    log.warn('Event "loadPreviousChapter" is not allowed in fixed contents');
    return;
  }
  const currentContentIndex = contents.findIndex((content) =>
    content.labels.map((l) => l.toLowerCase()).includes(currentContentSlug),
  );
  if (currentContentIndex <= 0) {
    log.warn(`Already in first chapter, can't load previous chapter`);
    return;
  }
  const currentContent = contents[currentContentIndex];
  const currentContentChapterNumber = parseInt(currentContent.cssUrl!.split('/')[1]!, 10);
  const previousContent = contents.find(
    (c) => parseInt(c.cssUrl!.split('/')[1]!, 10) === currentContentChapterNumber - 1,
  );
  if (previousContent) {
    const url = `${testingConfig.baseURL}books/${slug}/${previousContent.file}`;
    const response = await fetch(url);
    const html = await response.text();
    const chapterNumber = parseInt(previousContent.cssUrl!.split('/')[1]!, 10) + 1;
    const label = event.goToEnd
      ? previousContent.labels.slice().pop()!
      : previousContent.labels.slice().shift()!;
    const action: AppendNewContent = {
      type: 'appendNewContent',
      layout,
      slug,
      label,
      contentSlug: label.toLowerCase(),
      cssURL: `${testingConfig.baseURL}books/${slug}/${previousContent.cssUrl!}`,
      htmlContent: html.replace('<div', `<div class="c${chapterNumber}"`),
      chapterNumber,
      goToEnd: event.goToEnd,
    };
    dispatch(action).catch((ex) => {
      const { stack, message } = ex as Error;
      console.error('Error dispatching event', stack || message);
    });
  }
};

export default loadPreviousChapter;
