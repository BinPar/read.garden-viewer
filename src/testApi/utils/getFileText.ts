import testingConfig from '../../config/testing';

const getFileText = async (slug: string, relativePath: string): Promise<string> => {
  const url = `${testingConfig.baseURL}books/${slug}/${relativePath}`;
  const response = await fetch(url);
  return response.text();
};

export default getFileText;
