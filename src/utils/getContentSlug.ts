import { Content, ContentFile } from '../testApi/model/content';

/**
 * Gets slug for provided content
 * @param jsonIndex Content index json file
 * @param content Specific content (page)
 * @param label Label inside `labels` array
 * @returns Content slug
 */
const getContentSlug = (jsonIndex: Content, content: ContentFile, label: string): string => {
  if (jsonIndex.type === 'flow') {
    return label;
  }
  const match = content.file.match(/obfuscated-(.*).html/);
  if (match && match.groups) {
    return match[1];
  }
  return label.toLowerCase();
};

export default getContentSlug;
