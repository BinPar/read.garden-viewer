import { DispatchAPIAction } from '../../model/actions/common';
import { SetGapMode } from '../../model/actions/fixed';
import { AddOnChangeEvent } from '../../model/actions/global';
import { FixedState, State } from '../../model/state';
import { GapMode } from '../../model/viewerSettings';

const gapButtons = async (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): Promise<void> => {
  const controls = document.createElement('div');

  const allButton = document.createElement('button');
  allButton.innerText = 'Gap All';
  allButton.value = 'all';
  controls.appendChild(allButton);

  const pairsButton = document.createElement('button');
  pairsButton.innerText = 'Gap Pairs';
  pairsButton.value = 'pairs';
  controls.appendChild(pairsButton);

  const noneButton = document.createElement('button');
  noneButton.innerText = 'Gap None';
  noneButton.value = 'none';
  controls.appendChild(noneButton);

  const updateValue = (newValue: GapMode): void => {
    if (newValue === GapMode.None) {
      noneButton.classList.add('active');
      allButton.classList.remove('active');
      pairsButton.classList.remove('active');
    } else if (newValue === GapMode.All) {
      allButton.classList.add('active');
      noneButton.classList.remove('active');
      pairsButton.classList.remove('active');
    } else if (newValue === GapMode.Pairs) {
      pairsButton.classList.add('active');
      noneButton.classList.remove('active');
      allButton.classList.remove('active');
    }
  };

  const onGapModeChanged: AddOnChangeEvent<GapMode> = {
    type: 'addOnChangeEvent',
    propertyName: 'gapMode',
    event: updateValue,
  };

  await dispatcher(onGapModeChanged);

  const onChange = (e: MouseEvent): void => {
    const gapMode = (e.target as HTMLButtonElement).value as GapMode;
    const action: SetGapMode = {
      type: 'setGapMode',
      gapMode,
    };
    dispatcher(action).catch((ex) => {
      const { stack, message } = ex as Error;
      console.error('Error dispatching action', stack || message);
    });
  };

  allButton.onclick = onChange;
  pairsButton.onclick = onChange;
  noneButton.onclick = onChange;
  container.appendChild(controls);
  updateValue((state as FixedState).gapMode);
};

export default gapButtons;
