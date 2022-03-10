import { MoveNext, MovePrev } from '../../model';
import { DispatchAPIAction } from '../../model/actions/common';
import { State } from '../../model/state';

const directionButtons = (
  container: HTMLDivElement,
  state: State,
  dispatcher: DispatchAPIAction,
): void => {
  const leftButton = document.createElement('button');
  leftButton.innerText = '<-';

  const rightButton = document.createElement('button');
  rightButton.innerText = '->';

  const onLeft = (): void => {
    const moveLeft: MovePrev = {
      type: 'movePrev',
    };
    dispatcher(moveLeft).catch((ex) => {
      const { stack, message } = ex as Error;
      console.error('Error at dispatcher', stack || message);
    });
  };

  const onRight = (): void => {
    const moveRight: MoveNext = {
      type: 'moveNext',
    };
    dispatcher(moveRight).catch((ex) => {
      const { stack, message } = ex as Error;
      console.error('Error at dispatcher', stack || message);
    });
  };

  leftButton.onclick = onLeft;
  rightButton.onclick = onRight;

  container.appendChild(leftButton);
  container.appendChild(rightButton);
};

export default directionButtons;
