import { AddOnChangeEvent, SetDebugViewerSafeArea } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/actions/common';
import { State } from '../../model/state';

const debugViewerSafeArea = async (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): Promise<void> => {
  const button = document.createElement('button');
  const updateInnerText = (): void => {
    button.innerText = state.debugViewerSafeArea
      ? 'Debug Safe Area'
      : 'Normal Safe Area';
  };
  const onDebugViewerChange: AddOnChangeEvent<boolean> = {
    type: 'addOnChangeEvent',
    propertyName: 'debugViewerSafeArea',
    event: updateInnerText,
  };
  await dispatcher(onDebugViewerChange);
  const onClick = async (): Promise<void> => {
    const action: SetDebugViewerSafeArea = {
      type: 'setDebugViewerSafeArea',
      value: !state.debugViewerSafeArea,
    };
    await dispatcher(action);
  };
  button.onclick = onClick;
  updateInnerText();
  container.appendChild(button);
};

export default debugViewerSafeArea;
