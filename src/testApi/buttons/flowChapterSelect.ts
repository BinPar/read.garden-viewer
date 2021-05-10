import { State } from '../../model/state';

import jsonIndex from '../data/flowIndex.json';

const appendItems = (
  container: HTMLElement,
  items: typeof jsonIndex['spine'],
  numStartPage: number,
  secondLevel = false,
): string => {
  let currentValue = '';
  for (let i = 0, l = items.length; i < l; i++) {
    const {
      title,
      children,
      target: { label },
    } = items[i];
    const numTarget = parseInt(label, 10);
    if (numTarget <= numStartPage) {
      currentValue = label;
    }
    if (!secondLevel && children?.length) {
      const optionGroup = document.createElement('optgroup');
      optionGroup.label = title;
      currentValue = appendItems(optionGroup, children, numStartPage, true) || currentValue;
      container.appendChild(optionGroup);
    } else {
      const option = document.createElement('option');
      option.innerText = `${title} (${label})`;
      option.value = label;
      container.appendChild(option);
    }
  }
  return currentValue;
};

const flowChapterSelect = (container: HTMLDivElement, state: State): void => {
  const select = document.createElement('select');

  const numStartPage = parseInt(state.config.startPageLabel || '1', 10);
  const selected = appendItems(select, jsonIndex.spine, numStartPage);
  select.value = selected;

  const onChange = (): void => {
    if (state.config.eventHandler) {
      state.config.eventHandler({
        type: 'loadNewContent',
        contentSlug: state.config.contentSlug,
        label: select.value,
      });
    }
  };

  select.onchange = onChange;
  container.appendChild(select);
};

export default flowChapterSelect;
