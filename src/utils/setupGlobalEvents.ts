import { Resize } from '../model/actions/global';
import { DispatchAPIAction } from '../model/apiInterface';

const setupGlobalEvents = (dispatcher: DispatchAPIAction): void => {
  window.addEventListener('resize', (): void => {
    const action: Resize = {
      type: 'resize',
    };
    dispatcher(action);
  });
};

export default setupGlobalEvents;
