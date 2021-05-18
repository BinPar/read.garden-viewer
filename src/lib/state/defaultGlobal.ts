import { DefaultGlobalState } from '../../model/state';

const defaultGlobal: DefaultGlobalState = {
  scale: 1,
  readMode: false,
  securityMargins: {
    readMode: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
    uiMode: {
      top: 20,
      bottom: 20,
      left: 124,
      right: 20,
    },
  },
  basicDOMElementsCreated: false,
  wrapperReady: false,
  cssLoaded: true,
  recalculating: false,
  toggleReadModeOnClick: true,
};

export default defaultGlobal;
