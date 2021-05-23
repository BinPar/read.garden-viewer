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
      top: 50,
      bottom: 100,
      left: 200,
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
