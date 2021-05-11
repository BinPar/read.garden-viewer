import { SetTextAlign } from '../../model/actions/flow';
import { DispatchAPIAction } from '../../model/apiInterface';
import { LayoutTypes, State, TextAlignModes } from '../../model/state';

const textAlignButtons = (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): void => {
  const select = document.createElement('select');

  const defaultOption = document.createElement('option');
  defaultOption.innerText = 'Original';
  defaultOption.value = '';
  select.appendChild(defaultOption);

  const leftOption = document.createElement('option');
  leftOption.innerText = 'Left';
  leftOption.value = 'start';
  select.appendChild(leftOption);

  const justifiedOption = document.createElement('option');
  justifiedOption.innerText = 'Justified';
  justifiedOption.value = 'justify';
  select.appendChild(justifiedOption);

  const updateSelected = (): void => {
    if (state.layout === LayoutTypes.Flow) {
      select.value = state.textAlign || '';
    }
  };

  const onChange = async (): Promise<void> => {
    const action: SetTextAlign = {
      type: 'setTextAlign',
      textAlign: (select.value || null) as TextAlignModes,
    };
    await dispatcher(action);
    updateSelected();
  };

  select.onchange = onChange;
  container.appendChild(select);
  updateSelected();
};

export default textAlignButtons;
