import { SyntheticEvent } from '../../model/dom';
import setCSSProperty from '../../utils/setCSSProperty';
import getSyntheticEvent from './getSyntheticEvent';

const getClickedHighlight = (ev: MouseEvent | TouchEvent, event?: SyntheticEvent): string | null => {
  let res: string | null = null;
  setCSSProperty('highlights-pointer-events', 'auto');
  const syntheticEvent = event || getSyntheticEvent(ev);
  const elements = document.elementsFromPoint(syntheticEvent.clientX, syntheticEvent.clientY);
  for (let i = 0, l = elements.length; i < l && !res; i++) {
    const element = elements[i];
    if (element.classList.contains('rg-highlight')) {
      res = (element as HTMLDivElement).dataset.key || null;
    }
  }
  return res;
};

export default getClickedHighlight;
