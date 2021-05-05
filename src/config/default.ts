import { DefaultConfig } from '../model/config';
import { FitMode, ViewerMode } from '../model/viewerSettings';

const defaultConfig: DefaultConfig = {
  debugViewerSafeArea: false,
  initialFixedMode: ViewerMode.WithScroll,
  initialFitMode: FitMode.Height,
  initialReadMode: true,
  showPageSeparation: false,
  zoom: {
    max: 4,
    min: 0.1,
    steps: [
      0.1,
      0.2,
      0.3,
      0.4,
      0.5,
      0.75,
      1,
      1.25,
      1.5,
      1.75,
      2,
      2.5,
      3,
      3.5,
      4,
    ],
  },
  loadedContentsNumber: 5,
  fontSize: {
    min: 8,
    max: 32,
    step: 2,
  },
  columnGap: 216,
  pageChangeThreshold: 40,
  chapterChangeThreshold: 40,
  minCharsPerColumn: 50,
  maxCharsPerColumn: 70,
  initialFontSize: 16,
  initialScale: 1,
  readModeMargin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  uiModeMargin: {
    top: 20,
    right: 40,
    left: 40,
    bottom: 20,
  },
};

export default defaultConfig;
