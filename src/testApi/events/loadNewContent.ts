import log from 'loglevel';

import { AppendNewContent } from '../../model/actions/global';
import { LoadNewContent } from '../../model/events';
import { LayoutTypes } from '../../model/viewerSettings';

import loadIndexFile from '../utils/loadIndexFile';
import replaceUrls from '../utils/replaceUrls';
import { EventHandler } from './eventHandler';

import testingConfig from '../../config/testing';

const loadNewContent: EventHandler<LoadNewContent> = async (event, dispatch) => {
  const { slug, contentSlug } = event;
  const index = await loadIndexFile(slug);
  const { type: layout, contents } = index;
  // The following line DOES NOT work like this in RG viewer, because labels ARE NOT slugs
  const currentContent = contents.find((content) =>
    content.labels.map((l) => l.toLowerCase()).includes(contentSlug),
  );
  if (!currentContent) {
    log.error(`No label "${contentSlug}" found in content "${slug}"`);
    return;
  }
  const url = `${testingConfig.baseURL}books/${slug}/${currentContent.file}`;
  const response = await fetch(url);
  let htmlContent = await response.text();
  let cssURL = '';
  let chapterNumber: number | undefined;
  if (layout === LayoutTypes.Flow) {
    chapterNumber = parseInt(currentContent.cssUrl!.split('/')[1]!, 10) + 1;
    htmlContent = htmlContent.replace('<div', `<div class="c${chapterNumber}"`);
    cssURL = `${testingConfig.baseURL}books/${slug}/${currentContent.cssUrl!}`;
  }
  if (layout === LayoutTypes.Fixed) {
    if (index.cssURL) {
      htmlContent = replaceUrls(htmlContent);
      cssURL = `${testingConfig.baseURL}books/${slug}/${index.cssURL}`;
    } else {
      const fixedChapterNumber = parseInt(currentContent.cssUrl!.split('/')[1]!, 10) + 1;
      htmlContent = htmlContent.replace('<div', `<div class="c${fixedChapterNumber}"`);
      cssURL = `${testingConfig.baseURL}books/${slug}/${currentContent.cssUrl!}`;
    }
  }
  const action: AppendNewContent = {
    type: 'appendNewContent',
    layout,
    slug,
    contentSlug,
    label: currentContent.labels[0],
    chapterNumber,
    cssURL,
    htmlContent,
  };
  dispatch(action).catch((ex) => {
    const { stack, message } = ex as Error;
    console.error('Error dispatching appendNewContent action', stack || message);
  });
};

export default loadNewContent;
