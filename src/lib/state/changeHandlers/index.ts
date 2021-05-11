import { State, StatePropChangeHandler } from '../../../model/state';
import cssLoaded from './cssLoaderHandler';

const handlers: StatePropChangeHandler<keyof State>[] = [
  cssLoaded,
];

export default handlers;