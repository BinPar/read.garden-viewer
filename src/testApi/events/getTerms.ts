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
    const matches = deobfuscatedText.matchAll(new RegExp(term, 'ig'));
    Array.from(matches).forEach(([match]) => {
      let index = deobfuscatedText.indexOf(match);
      while (index !== -1) {
        obfuscatedTerms.add(obfuscatedText.substr(index, match.length));
        index = deobfuscatedText.indexOf(match, index + match.length);
      }
    });
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
