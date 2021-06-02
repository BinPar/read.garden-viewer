import { DefaultGlobalState } from '../../model/state';

const defaultGlobal: DefaultGlobalState = {
  dragging: false,
  selectingText: false,
  scale: 1,
  readMode: false,
  basicDOMElementsCreated: false,
  wrapperReady: false,
  cssLoaded: true,
  recalculating: false,
  toggleReadModeOnClick: true,
  theme: 'light',
};

export default defaultGlobal;
