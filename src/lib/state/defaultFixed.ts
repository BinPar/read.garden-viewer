import { FixedState, FixedViewerContentInfo, LayoutTypes } from '../../model/state';

const defaultFixed: FixedState = {
  contentsByOrder: new Map<number, FixedViewerContentInfo>(),
  contentsByLabel: new Map<string, FixedViewerContentInfo>(),
  contentsInfo: [],
  currentContentIndex: 0,
  loadingContent: true,
  loadedCssUrls: new Set<string>(),
  layout: LayoutTypes.Fixed,
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
