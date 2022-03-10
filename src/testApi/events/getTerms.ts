import { HighlightSearchTerms } from '../../model/actions/global';
import { GetTerms } from '../../model/events';
import getFileText from '../utils/getFileText';
import { EventHandler } from './eventHandler';

const getTerms: EventHandler<GetTerms> = async (
  event,
  dispatch,
) => {
  const deobfuscatedText = await getFileText(event.slug, 'search.txt');
  const obfuscatedText = await getFileText(event.slug, 'obfuscated-search.txt');

  const obfuscatedTerms = new Set<string>();
  const terms = event.text.split(' ');
  terms.forEach((term) => {
    let index = deobfuscatedText.indexOf(term);
    while (index !== -1) {
      obfuscatedTerms.add(obfuscatedText.substr(index, term.length));
      index = deobfuscatedText.indexOf(term, index + term.length);
    }
  });
  
  const action: HighlightSearchTerms = {
    type: 'highlightSearchTerms',
    terms: Array.from(obfuscatedTerms),
  };

  dispatch(action).catch((ex) => {
    const { stack, message } = ex as Error;
    console.error('Error dispatching action', stack || message);
  });
};

export default getTerms;
