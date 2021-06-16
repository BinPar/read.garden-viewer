import { StatePropChangeHandler } from '../../../model/state';
import getPropertyChangeHandler from '../../../utils/getPropertyChangeHandler';

const { resolver, waiter } = getPropertyChangeHandler(true);

export const onRecalculateFinish = waiter;

const recalculatingHandler: StatePropChangeHandler<'recalculating'> = {
  property: 'recalculating',
  value: false,
  handler: resolver,
};

export default recalculatingHandler;
