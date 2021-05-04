import extractJsonIndex from './extractJsonIndex';
import extractFilesToOutput from './extractFilesToOutput';

/**
 * Extracts contents from a single compressed files and writes them into the output path
 * @param pathToFile Path to compressed file.
 * @param outputPath Path to write contents to.
 */
const oneFileToPath = async (
  pathToFile: string,
  outputPath: string,
): Promise<void> => {
  await extractFilesToOutput(pathToFile, await extractJsonIndex(pathToFile), outputPath);
};

export default oneFileToPath;
