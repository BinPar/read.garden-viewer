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
      state.config.eventHandler({
        type: 'getTerms',
        slug: state.config.slug,
        text: input.value,
      });
    }
  };

  container.appendChild(form);
};

export default searchButtons;
