import { AddOnChangeEvent, DispatchAPIAction, SetDoublePage, State } from '../../model';

const doublePageButtons = async (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): Promise<void> => {
  const controls = document.createElement('div');

  const singlePageButton = document.createElement('button');
  singlePageButton.innerText = 'Simple Page';
  singlePageButton.value = '0';
  controls.appendChild(singlePageButton);

  const doublePageButton = document.createElement('button');
  doublePageButton.innerText = 'Double Page';
  doublePageButton.value = '1';
  controls.appendChild(doublePageButton);

  const updateValue = (doublePage: boolean): void => {
    if (doublePage) {
      doublePageButton.classList.add('active');
      singlePageButton.classList.remove('active');
    } else {
      doublePageButton.classList.remove('active');
      singlePageButton.classList.add('active');
    }
  };

  const onDoublePageChange: AddOnChangeEvent<boolean> = {
    type: 'addOnChangeEvent',
    propertyName: 'doublePage',
    returnValue: true,
    event: updateValue,
  };

  await dispatcher(onDoublePageChange);

  const onChange = (e: MouseEvent): void => {
    const doublePage = !!parseInt((e.target as HTMLButtonElement).value, 10);
    const action: SetDoublePage = {
      type: 'setDoublePage',
      doublePage,
    };
    dispatcher(action).catch((ex) => {
      const { stack, message } = ex as Error;
      console.error('Error dispatching action', stack || message);
    });
  };

  singlePageButton.onclick = onChange;
  doublePageButton.onclick = onChange;
  container.appendChild(controls);
};

export default doublePageButtons;
