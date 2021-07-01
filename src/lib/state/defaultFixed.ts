import { FixedState, FixedViewerContentInfo } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

const defaultFixed: FixedState = {
  layout: LayoutTypes.Fixed,
  contentsByOrder: new Map<number, FixedViewerContentInfo>(),
  contentsBySlug: new Map<string, FixedViewerContentInfo>(),
  contentsInfo: new Array<FixedViewerContentInfo>(),
  currentContentIndex: 0,
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
};

export default defaultFixed;
