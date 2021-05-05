import { FixedState, LayoutTypes } from '../../model/state';

const defaultFixed: FixedState = {
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
