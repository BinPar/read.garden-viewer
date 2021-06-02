import { AddOnChangeEvent, SetTheme } from '../../model/actions/global';
import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';
import { ViewerTheme } from '../../model/viewerSettings';

const themeButtons = async (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): Promise<void> => {
  const controls = document.createElement('div');

  const lightButton = document.createElement('button');
  lightButton.innerText = 'Light';
  lightButton.value = 'light';
  controls.appendChild(lightButton);

  const darkButton = document.createElement('button');
  darkButton.innerText = 'Dark';
  darkButton.value = 'dark';
  controls.appendChild(darkButton);

  const updateValue = (newValue: ViewerTheme): void => {
    const active = newValue === 'dark' ? darkButton : lightButton;
    const inactive = newValue === 'dark' ? lightButton : darkButton;
    active.classList.add('active');
    inactive.classList.remove('active');
  };
  
  const onDarkModeChanged: AddOnChangeEvent<ViewerTheme> = {
    type: 'addOnChangeEvent',
    propertyName: 'theme',
    event: updateValue,
  }

  await dispatcher(onDarkModeChanged);
  
  const onChange = (e: MouseEvent): void => {
    const theme = (e.target as HTMLButtonElement)!.value as ViewerTheme;
    const action: SetTheme = {
      type: 'setTheme',
      theme,
    };
    dispatcher(action);
  };

  lightButton.onclick = onChange;
  darkButton.onclick = onChange;
  container.appendChild(controls);
  updateValue(state.theme);
};

export default themeButtons;
