import { SetFontFamily } from '../../model/actions/flow';
import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

const fontFamilyButtons = (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): void => {
  const select = document.createElement('select');

  for (let i = 0, l = state.config.availableFontFamilies.length; i < l; i++) {
    const option = document.createElement('option');
    const fontFamily = state.config.availableFontFamilies[i];
    option.innerText = fontFamily;
    option.value = fontFamily;
    select.appendChild(option);
  }
  
  const updateSelected = (): void => {
    if (state.layout === LayoutTypes.Flow) {
      select.value = state.fontFamily;
    }
  };

  const onChange = async (): Promise<void> => {
    const action: SetFontFamily = {
      type: 'setFontFamily',
      fontFamily: select.value,
    };
    await dispatcher(action);
    updateSelected();
  };

  select.onchange = onChange;
  container.appendChild(select);
  updateSelected();
};

export default fontFamilyButtons;
