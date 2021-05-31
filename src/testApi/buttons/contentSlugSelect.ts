import { AddOnChangeEvent } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';
import loadIndexFile from '../utils/loadIndexFile';

const contentSlugSelect = (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): void => {
  loadIndexFile(state.config.slug).then((jsonIndex) => {
    const select = document.createElement('select');

    jsonIndex.contents.forEach((content): void => {
      content.labels.forEach((label): void => {
        const option = document.createElement('option');
        option.innerText = `${label}`;
        option.value = label;
        select.appendChild(option);
      });      
    })
    const onChange = (): void => {
      if (select.value && state.config.eventHandler) {
        /* state.config.eventHandler({
          type: 'loadNewContent',
          slug: state.config.slug,
          contentSlug: select.value,
        }); */
      }
    };

    select.onchange = onChange;
    container.appendChild(select);

    const onContentSlugChanged = (contentSlug: string): void => {
      select.value = `${contentSlug}`
    };

    const contentSlugChanged: AddOnChangeEvent<string> = {
      type: 'addOnChangeEvent',
      propertyName: 'contentSlug',
      event: onContentSlugChanged,
    };
    select.value = `${state.contentSlug}`
    dispatcher(contentSlugChanged);
  });
};

export default contentSlugSelect;
