import { AddOnChangeEvent, NavigateToPage } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';
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
      option.value = label;
      select.appendChild(option);
    });
  });
  
  const onChange = (): void => {
    if (select.value && state.config.eventHandler) {
      const action: NavigateToPage = {
        type: 'navigateToPage',
        pageLabel: select.value,
      };
      dispatcher(action);
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
  dispatcher(contentSlugChanged);
};

export default contentSlugSelect;
