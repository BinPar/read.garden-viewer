import testingConfig from '../../config/testing';

/**
 * Gets file text content
 * @param slug Book slug
 * @param relativePath Relative path inside book folder
 */
const getFileText = async (slug: string, relativePath: string): Promise<string> => {
  const url = `${testingConfig.baseURL}books/${slug}/${relativePath}`;
  const response = await fetch(url);
  return response.text();
};

export default getFileText;
