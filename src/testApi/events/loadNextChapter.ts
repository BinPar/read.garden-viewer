import log from 'loglevel';
import testingConfig from '../../config/testing';
import { AppendNewContent } from '../../model/actions/global';

import { LoadNextChapter } from '../../model/events';
import { LayoutTypes } from '../../model/viewerSettings';
import loadIndexFile from '../utils/loadIndexFile';
import { EventHandler } from './eventHandler';

const loadNextChapter: EventHandler<LoadNextChapter> = async (event, dispatch) => {
  const { slug, currentContentSlug } = event;
  const index = await loadIndexFile(slug);
  const { type: layout, contents } = index;
  if (layout === LayoutTypes.Fixed) {
    log.warn('Event "loadNextChapter" is not allowed in fixed contents');
    return;
  }
  const currentContentIndex = contents.findIndex((content) =>
    content.labels.map((l) => l.toLowerCase()).includes(currentContentSlug),
  );
  if (currentContentIndex >= contents.length - 1) {
    log.warn(`Already in last chapter, can't load next chapter`);
    return;
  }
  const currentContent = contents[currentContentIndex];
  const nextContent = contents[currentContentIndex + 1];
  const url = `${testingConfig.baseURL}books/${slug}/${nextContent.file}`;
  const response = await fetch(url);
  let htmlContent = await response.text();
  let cssURL = '';
  const chapterNumber = nextContent.cssUrl
    ? parseInt(nextContent.cssUrl.split('/')[1]!, 10)
    : currentContentIndex + 1;
  if (!index.cssURL && currentContent.cssUrl) {
    htmlContent = `<div class="c${chapterNumber}">${htmlContent}</div>`;
  }
  cssURL = `${testingConfig.baseURL}books/${slug}/${index.cssURL || currentContent.cssUrl!}`;
  const label = nextContent.labels.slice().shift()!;
  const action: AppendNewContent = {
    type: 'appendNewContent',
    layout,
    slug,
    label,
    contentSlug: label.toLowerCase(),
    cssURL,
    htmlContent,
    chapterNumber,
  };
  dispatch(action).catch((ex) => {
    const { stack, message } = ex as Error;
    console.error('Error dispatching action', stack || message);
  });
};

export default loadNextChapter;
