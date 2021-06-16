import { AddOnChangeEvent } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/actions/common';
import { State } from '../../model/state';
import { Content, SpineNode } from '../model/content';

const values: number[] = [];

const appendItems = (
  container: HTMLElement,
  items: SpineNode[],
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
    if (label) {
      const numTarget = parseInt(label, 10);
      if (numTarget <= numStartPage) {
        currentValue = label;
      }
    }
    if (!secondLevel && children?.length) {
      const optionGroup = document.createElement('optgroup');
      optionGroup.label = title;
      const [firstChild] = children;
      if (label && firstChild.target.label && firstChild.target.label !== label) {
        const option = document.createElement('option');
        option.innerText = `${title} (${label})`;
        option.value = label || '';
        optionGroup.appendChild(option);
        values.push(parseInt(label, 10));
      }
      currentValue =
        appendItems(optionGroup, children, numStartPage, true) || currentValue;
      container.appendChild(optionGroup);
    } else {
      const option = document.createElement('option');
      option.innerText = `${title} (${label})`;
      option.value = label || '';
      if (label) {
        values.push(parseInt(label, 10));
      }
      container.appendChild(option);
    }
  }
  return currentValue;
};

const flowChapterSelect = (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
  jsonIndex: Content
): void => {
  const select = document.createElement('select');

  const numStartPage = parseInt(state.config.contentSlug || '1', 10);
  values.splice(0, values.length);
  const selected = appendItems(select, jsonIndex.spine, numStartPage, false);
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
    const target = parseInt(contentSlug, 10);
    const value = values.find((v, i) => target >= v && (values[i + 1] ?? Infinity) > target);
    select.value = `${value}`;
  };

  const contentSlugChanged: AddOnChangeEvent<string> = {
    type: 'addOnChangeEvent',
    propertyName: 'contentSlug',
    event: onContentSlugChanged,
  };

  dispatcher(contentSlugChanged);
};

export default flowChapterSelect;
