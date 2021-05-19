import { SetReadMode } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';

const readModeToggle = (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): void => {
  const button = document.createElement('button');
  const updateInnerText = (): void => {
    button.innerText = state.readMode
      ? 'Read Mode'
      : 'UI Mode';
  };
  const onClick = async (): Promise<void> => {
    const action: SetReadMode = {
      type: 'setReadMode',
      readModeActive: !state.readMode,
    };
    await dispatcher(action);
    updateInnerText();
  };
  button.onclick = onClick;
  updateInnerText();
  container.appendChild(button);
};

export default readModeToggle;
