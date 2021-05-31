import { AddOnChangeEvent } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';
import { SpineNode } from '../model/content';

import loadIndexFile from '../utils/loadIndexFile';

const appendItems = (
  container: HTMLElement,
  items: SpineNode[],
  numStartPage: number,
  secondLevel = false,
  dispatcher: DispatchAPIAction,
): string => {
  let currentValue = '';
  for (let i = 0, l = items.length; i < l; i++) {
    const {
      title,
      children,
      target: { label },
    } = items[i];
    if (label) {
      const numTarget = parseInt(label, 10);
      if (numTarget <= numStartPage) {
        currentValue = label;
      }
    }
    if (!secondLevel && children?.length) {
      const optionGroup = document.createElement('optgroup');
      optionGroup.label = title;
      currentValue =
        appendItems(optionGroup, children, numStartPage, true, dispatcher) || currentValue;
      container.appendChild(optionGroup);
    } else {
      const option = document.createElement('option');
      option.innerText = `${title} (${label})`;
      option.value = label || '';
      container.appendChild(option);
    }
  }
  return currentValue;
};

const flowChapterSelect = (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): void => {
  loadIndexFile(state.config.slug).then((jsonIndex) => {
    const select = document.createElement('select');

    const numStartPage = parseInt(state.config.contentSlug || '1', 10);
    const selected = appendItems(select, jsonIndex.spine, numStartPage, false, dispatcher);
    select.value = selected;

    const onChange = (): void => {
      if (select.value && state.config.eventHandler) {
        state.config.eventHandler({
          type: 'loadNewContent',
          slug: state.config.slug,
          contentSlug: select.value,
        });
      }
    };

    select.onchange = onChange;
    container.appendChild(select);

    const onContentSlugChanged = (contentSlug: string): void => {
      console.log(`Move To: ${contentSlug}`);
      // @miguel: Select current node my getting the previous spine node
    };

    const contentSlugChanged: AddOnChangeEvent<string> = {
      type: 'addOnChangeEvent',
      propertyName: 'contentSlug',
      event: onContentSlugChanged,
    };

    dispatcher(contentSlugChanged);
  });
};

export default flowChapterSelect;
