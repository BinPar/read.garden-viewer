import { SetScrollMode } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/actions/common';
import { State } from '../../model/state';
import { LayoutTypes, ScrollModes } from '../../model/viewerSettings';

const scrollModeButtons = (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): void => {
  const select = document.createElement('select');

  const horizontalOption = document.createElement('option');
  horizontalOption.innerText = 'Horizontal';
  horizontalOption.value = 'horizontal';
  select.appendChild(horizontalOption);

  const verticalOption = document.createElement('option');
  verticalOption.innerText = 'Vertical';
  verticalOption.value = 'vertical';
  select.appendChild(verticalOption);

  const updateSelected = (): void => {
    if (state.layout === LayoutTypes.Flow) {
      select.value = state.scrollMode;
    }
  };

  const onChange = async (): Promise<void> => {
    const action: SetScrollMode = {
      type: 'setScrollMode',
      scrollMode: select.value as ScrollModes,
    };
    await dispatcher(action);
    updateSelected();
  };

  select.onchange = onChange;
  container.appendChild(select);
  updateSelected();
};

export default scrollModeButtons;
