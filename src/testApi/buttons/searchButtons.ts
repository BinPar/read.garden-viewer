import log from 'loglevel';
import { State } from '../../model/state';

const searchButtons = (
  container: HTMLDivElement,
  state: State,
): void => {
  const form = document.createElement('form');
  form.classList.add('search-form');

  const label = document.createElement('label');
  label.htmlFor = 'search';

  const input = document.createElement('input');
  input.name = 'search';
  input.type = 'text';

  label.appendChild(input);
  form.appendChild(label);

  const button = document.createElement('button');
  button.innerText = 'Search!';
  button.type = 'submit';

  form.appendChild(button);

  form.onsubmit = (e): void => {
    e.preventDefault();
    if (input.value && state.config.eventHandler) {
      log.info('Searching', input.value);
      state.config.eventHandler({
        type: 'getTerms',
        slug: state.config.slug,
        productSlug: state.productSlug,
        text: input.value,
      }).catch((ex) => {
        const { stack, message } = ex as Error;
        console.error('Error at event handler', stack || message);
      });
    }
  };

  container.appendChild(form);
};

export default searchButtons;
