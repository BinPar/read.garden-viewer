import { DecreaseFontSize, IncreaseFontSize, SetFontSize } from '../../model/actions/flow';
import { DispatchAPIAction } from '../../model/apiInterface';
import { LayoutTypes, State } from '../../model/state';

const fontSizeButtons = (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): void => {
  const controls = document.createElement('div');

  const increaseButton = document.createElement('button');
  increaseButton.innerText = 'F+';
  controls.appendChild(increaseButton);

  const fontSizeDisplay = document.createElement('input');
  controls.appendChild(fontSizeDisplay);

  const decreaseButton = document.createElement('button');
  decreaseButton.innerText = 'F-';
  controls.appendChild(decreaseButton);

  const updateValue = (): void => {
    if (state.layout === LayoutTypes.Flow) {
      fontSizeDisplay.value = `${state.fontSize}`;
    }
  };

  const onKeyDown = async (e: KeyboardEvent): Promise<void> => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      const size = parseInt(fontSizeDisplay.value, 10);
      if (!Number.isNaN(size)) {
        const action: SetFontSize = {
          type: 'setFontSize',
          size,
        };
        await dispatcher(action);
        updateValue();
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
    updateValue();
  };

  const onDecrease = async (): Promise<void> => {
    const action: DecreaseFontSize = {
      type: 'decreaseFontSize',
    };
    await dispatcher(action);
    updateValue();
  };

  fontSizeDisplay.onkeydown = onKeyDown;
  increaseButton.onclick = onIncrease;
  decreaseButton.onclick = onDecrease;

  updateValue();

  container.appendChild(controls);
};

export default fontSizeButtons;
