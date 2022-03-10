import { AddOnChangeEvent, NavigateToPage } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/actions/common';
import { State } from '../../model/state';
import getContentSlug from '../../utils/getContentSlug';
import { Content } from '../model/content';

const contentSlugSelect = (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
  jsonIndex: Content,
): void => {
  const select = document.createElement('select');

  jsonIndex.contents.forEach((content): void => {
    content.labels.forEach((label): void => {
      const option = document.createElement('option');
      option.innerText = `${label}`;
      option.value = getContentSlug(jsonIndex, content, label);
      select.appendChild(option);
    });
  });
  
  const onChange = (): void => {
    if (select.value && state.config.eventHandler) {
      const action: NavigateToPage = {
        type: 'navigateToPage',
        contentSlug: select.value,
      };
      dispatcher(action).catch((ex) => {
    const { stack, message } = ex as Error;
    console.error('Error at dispatcher', stack || message);
  });
    }
  };

  select.onchange = onChange;
  container.appendChild(select);

  const onContentSlugChanged = (contentSlug: string): void => {
    select.value = `${contentSlug}`;
  };

  const contentSlugChanged: AddOnChangeEvent<string> = {
    type: 'addOnChangeEvent',
    propertyName: 'contentSlug',
    event: onContentSlugChanged,
  };
  select.value = `${state.contentSlug}`;
  dispatcher(contentSlugChanged).catch((ex) => {
    const { stack, message } = ex as Error;
    console.error('Error at dispatcher', stack || message);
  });
};

export default contentSlugSelect;
