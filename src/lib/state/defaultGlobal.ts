import { DefaultGlobalState } from '../../model/state';

const defaultGlobal: DefaultGlobalState = {
  scale: 1,
  readMode: false,
  securityMargins: {
    readMode: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    uiMode: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  basicDOMElementsCreated: false,
  wrapperReady: false,
  cssLoaded: true,
  recalculating: false,
};

export default defaultGlobal;
