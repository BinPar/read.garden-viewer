import { State, StatePropChangeHandler } from '../../../model/state';

import cssLoaderHandler from './cssLoaderHandler';
import recalculatingHandler from './recalculatingHandler';

const handlers: StatePropChangeHandler<keyof State>[] = [
  cssLoaderHandler,
  recalculatingHandler,
];

export default handlers;