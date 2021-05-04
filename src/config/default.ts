import { Config } from '../model/config';
import { FitMode, ViewerMode } from '../model/viewer';

const defaultConfig: Config = {
  defaultFixedMode: ViewerMode.WithScroll,
  initialFitMode: FitMode.Height,
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
    current: FitMode.Width,
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
};

export default defaultConfig;
