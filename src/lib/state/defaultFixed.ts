import { FixedState, FixedViewerContentInfo } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

const defaultFixed: FixedState = {
  layout: LayoutTypes.Fixed,
  contentsByOrder: new Map<number, FixedViewerContentInfo>(),
  contentsByLabel: new Map<string, FixedViewerContentInfo>(),
  contentsInfo: new Array<FixedViewerContentInfo>(),
  currentContentIndex: 0,
  loadingContent: true,
  loadedCssUrls: new Set<string>(),
  hasHorizontalScroll: false,
  hasVerticalScroll: false,
  horizontalTranslate: 0,
  maxHorizontalTranslate: 0,
  maxVerticalTranslate: 0,
  minHorizontalTranslate: 0,
  minVerticalTranslate: 0,
  verticalTranslate: 0,
};

export default defaultFixed;
