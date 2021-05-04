import extractJsonIndex from './extractJsonIndex';
import extractFilesToOutput from './extractFilesToOutput';

const oneFileToPath = async (
  pathToOneFile: string,
  outputPath: string,
): Promise<void> => {
  await extractFilesToOutput(pathToOneFile, await extractJsonIndex(pathToOneFile), outputPath);
};

export default oneFileToPath;
