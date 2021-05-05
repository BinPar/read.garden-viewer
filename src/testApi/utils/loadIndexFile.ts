import { Content } from '../model/content';
import testingConfig from '../../config/testing';

let lastSlug: string;
let lastContent: Content;

const loadIndexFile = async (slug: string): Promise<Content> => {
  if (lastSlug === slug) {
    return lastContent;
  }
  const url = `${testingConfig.baseURL}books/${slug}/index.json`;
  const response = await fetch(url);
  const content = (await response.json()) as Content;
  lastSlug = slug;
  lastContent = content;
  return content;
};

export default loadIndexFile;
