import { StatePropChangeHandler } from '../../../model/state';
import getPropertyChangeHandler from '../../../utils/getPropertyChangeHandler';

const { resolver, waiter } = getPropertyChangeHandler(true);

export const onWrapperReady = waiter;

const wrapperReadyHandler: StatePropChangeHandler<'wrapperReady'> = {
  property: 'wrapperReady',
  value: true,
  handler: resolver,
};

export default wrapperReadyHandler;
