import { SetDebugViewerSafeArea } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';

const debugViewerSafeArea = (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): void => {
  const button = document.createElement('button');
  const updateInnerText = (): void => {
    button.innerText = state.debugViewerSafeArea
      ? 'Debug Safe Area'
      : 'Normal Safe Area';
  };
  const onClick = async (): Promise<void> => {
    const action: SetDebugViewerSafeArea = {
      type: 'setDebugViewerSafeArea',
      value: !state.debugViewerSafeArea,
    };
    await dispatcher(action);
    updateInnerText();
  };
  button.onclick = onClick;
  updateInnerText();
  container.appendChild(button);
};

export default debugViewerSafeArea;
