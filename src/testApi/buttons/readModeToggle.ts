import { AddOnChangeEvent, SetReadMode } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/actions/common';
import { State } from '../../model/state';

const readModeToggle = async (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): Promise<void> => {
  const button = document.createElement('button');
  const updateInnerText = (): void => {
    button.innerText = state.readMode ? 'Read Mode' : 'UI Mode';
  };
  const onReadModeChange: AddOnChangeEvent<boolean> = {
    type: 'addOnChangeEvent',
    propertyName: 'readMode',
    event: updateInnerText,
  };
  await dispatcher(onReadModeChange);
  const onClick = async (ev: MouseEvent): Promise<void> => {
    if (ev.button === 0) {
      const action: SetReadMode = {
        type: 'setReadMode',
        readModeActive: !state.readMode,
      };
      await dispatcher(action);
    }
  };
  button.onclick = onClick;
  updateInnerText();
  container.appendChild(button);
};

export default readModeToggle;
