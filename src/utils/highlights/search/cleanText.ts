/**
 * Cleans text for a search
 * @param {string} text text to clear
 * @returns {string} clean text
 */
const cleanText = (text: string): string =>
  text
    .trim()
    .replace(/([.,/#!$%^&*;:{}=\-_`~()\][])/g, ' ')
    .replace(/  +/g, ' ');

export default cleanText;
