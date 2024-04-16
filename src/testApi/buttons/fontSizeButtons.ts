import { DecreaseFontSize, IncreaseFontSize, SetFontSize } from '../../model/actions/flow';
import { AddOnChangeEvent } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/actions/common';
import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

const fontSizeButtons = async (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): Promise<void> => {
  const controls = document.createElement('div');

  const increaseButton = document.createElement('button');
  increaseButton.innerText = 'F+';
  controls.appendChild(increaseButton);

  const decreaseButton = document.createElement('button');
  decreaseButton.innerText = 'F-';
  controls.appendChild(decreaseButton);

  const range = document.createElement('input');
  range.type = 'range';
  range.min = '12';
  range.max = '36';
  range.step = '2';
  controls.appendChild(range);

  const fontSizeDisplay = document.createElement('input');
  controls.appendChild(fontSizeDisplay);

  const updateValue = (): void => {
    if (state.layout === LayoutTypes.Flow) {
      fontSizeDisplay.value = `${state.fontSize}`;
      range.value = `${state.fontSize}`;
    }
  };

  const onFontSizeChanged: AddOnChangeEvent<number> = {
    type: 'addOnChangeEvent',
    propertyName: 'fontSize',
    returnValue: true,
    event: updateValue,
  };

  await dispatcher(onFontSizeChanged);

  const onKeyDown = async (e: KeyboardEvent): Promise<void> => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      const size = parseInt(fontSizeDisplay.value, 10);
      if (!Number.isNaN(size)) {
        const action: SetFontSize = {
          type: 'setFontSize',
          size,
        };
        await dispatcher(action);
      } else {
        // eslint-disable-next-line no-console
        console.warn('Provided value is not a number');
      }
    }
  };

  const onIncrease = async (): Promise<void> => {
    const action: IncreaseFontSize = {
      type: 'increaseFontSize',
    };
    await dispatcher(action);
  };

  const onDecrease = async (): Promise<void> => {
    const action: DecreaseFontSize = {
      type: 'decreaseFontSize',
    };
    await dispatcher(action);
  };

  const onChange = async (ev: Event): Promise<void> => {
    const size = parseInt((ev.target as HTMLInputElement).value, 10);
    const action: SetFontSize = {
      type: 'setFontSize',
      size,
    };
    await dispatcher(action);
  };

  fontSizeDisplay.onkeydown = onKeyDown;
  increaseButton.onclick = onIncrease;
  decreaseButton.onclick = onDecrease;
  range.oninput = onChange;
  container.appendChild(controls);
  updateValue();
};

export default fontSizeButtons;
