import testingConfig from '../../config/testing';

const cdnRegEx = /%%CDN%%/g;

/**
 * Replaces URLs inside content HTML
 * @param src Original source
 */
const replaceUrls = (src: string): string => {
  const url = `http${testingConfig.isDev ? '' : 's'}://${testingConfig.cdnDomain}/books`;
  return src.replace(cdnRegEx, url);
};

export default replaceUrls;
