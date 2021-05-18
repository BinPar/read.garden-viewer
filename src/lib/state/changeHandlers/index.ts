import { State, StatePropChangeHandler } from '../../../model/state';

import cssLoaderHandler from './cssLoaderHandler';
import recalculatingHandler from './recalculatingHandler';
import wrapperReadyHandler from './wrapperReadyHandler';

const handlers: StatePropChangeHandler<keyof State>[] = [
  cssLoaderHandler,
  recalculatingHandler,
  wrapperReadyHandler,
];

export default handlers;