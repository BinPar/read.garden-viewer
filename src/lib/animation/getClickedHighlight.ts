import { SyntheticEvent } from '../../model/dom';
import setCSSProperty from '../../utils/setCSSProperty';
import getSyntheticEvent from './getSyntheticEvent';

const getClickedHighlight = (ev: MouseEvent | TouchEvent, event?: SyntheticEvent): string | null => {
  let res: string | null = null;
  setCSSProperty('highlights-pointer-events', 'auto');
  const syntheticEvent = event || getSyntheticEvent(ev);
  const clickedElement = document.elementFromPoint(syntheticEvent.clientX, syntheticEvent.clientY);
  setCSSProperty('highlights-pointer-events', 'none');
  if (clickedElement?.classList.contains('rg-highlight')) {
    res = (clickedElement as HTMLDivElement).dataset.key || null;
  }
  return res;
};

export default getClickedHighlight;
