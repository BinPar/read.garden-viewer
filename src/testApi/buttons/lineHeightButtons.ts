import { LayoutTypes, LineHeight, SetLineHeight } from '../../model';
import { DispatchAPIAction } from '../../model/actions/common';
import { State } from '../../model/state';

const lineHeightButtons = (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): void => {
  const select = document.createElement('select');

  [1.25, 1.5, 1.75].forEach((value) => {
    const option = document.createElement('option');
    option.innerText = `${value}`;
    option.value = `${value}`;
    select.appendChild(option);
  });

  const updateSelected = (): void => {
    if (state.layout === LayoutTypes.Flow) {
      select.value = `${state.lineHeight}`;
    }
  };

  const onChange = async (): Promise<void> => {
    const action: SetLineHeight = {
      type: 'setLineHeight',
      lineHeight: Number(select.value) as LineHeight,
    };
    await dispatcher(action);
    updateSelected();
  };

  select.onchange = onChange;
  container.appendChild(select);
  updateSelected();
};

export default lineHeightButtons;
