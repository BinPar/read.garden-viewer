import { FixedState, FixedViewerContentInfo } from '../../model/state';
import { GapMode, LayoutTypes } from '../../model/viewerSettings';

const defaultFixed: FixedState = {
  layout: LayoutTypes.Fixed,
  fixedInfo: [],
  contentsByOrder: new Map<number, FixedViewerContentInfo>(),
  contentsBySlug: new Map<string, FixedViewerContentInfo>(),
  contentsInfo: new Array<FixedViewerContentInfo>(),
  loadedCssUrls: new Set<string>(),
  fixedStylesNodes: [],
  zoom: 1,
  zoomSpeed: 0.01,
  maximumZoomValue: 4,
  minimumZoomValue: 0.5,  
  hasHorizontalScroll: false,
  hasVerticalScroll: false,
  horizontalTranslate: 0,
  maxHorizontalTranslate: 0,
  maxVerticalTranslate: 0,
  minHorizontalTranslate: 0,
  minVerticalTranslate: 0,
  verticalTranslate: 0,
  maxHeight: 0,
  maxWidth: 0,
  gapMode: GapMode.None,
  gapSize: 16,
};

export default defaultFixed;
