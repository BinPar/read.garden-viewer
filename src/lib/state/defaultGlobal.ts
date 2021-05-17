import { DefaultGlobalState } from '../../model/state';

const defaultGlobal: DefaultGlobalState = {
  scale: 1,
  basicDOMElementsCreated: false,
  wrapperReady: false,
  cssLoaded: true,
  recalculating: false,
};

export default defaultGlobal;
