import { NavigateToNextChapter, NavigateToPreviousChapter } from '../../model/actions/flow';
import { DispatchAPIAction } from '../../model/actions/common';
import { State } from '../../model/state';

const chapterNavigationButtons = (container: HTMLDivElement, state: State, dispatcher: DispatchAPIAction): void  => {
  const controls = document.createElement('div');

  const prevButton = document.createElement('button');
  prevButton.innerText = 'Prev';
  controls.appendChild(prevButton);

  const nextButton = document.createElement('button');
  nextButton.innerText = 'Next';
  controls.appendChild(nextButton);

  const onPrev = async (): Promise<void> => {
    const action: NavigateToPreviousChapter = {
      type: 'navigateToPreviousChapter',
    };
    await dispatcher(action);
  };

  const onNext = async (): Promise<void> => {
    const action: NavigateToNextChapter = {
      type: 'navigateToNextChapter',
    };
    await dispatcher(action);
  };

  prevButton.onclick = onPrev;
  nextButton.onclick = onNext;

  container.appendChild(controls);
};

export default chapterNavigationButtons;
