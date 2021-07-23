/* eslint-disable no-param-reassign */
import { DispatchAPIAction } from '../../model/actions/common';
import { State } from '../../model/state';
import { FitMode, LayoutTypes } from '../../model/viewerSettings';
import setCSSProperty from '../../utils/setCSSProperty';
import { updateState } from '../state';
import { addOnChangeEventListener } from '../state/stateChangeEvents';
import getScrollFromContentSlug from './getScrollFromContentSlug';
import interpolate from './interpolate';
import {
  scale,
  left,
  top,
  scroll,
  altScroll,
  zoom,
  leftCorrector,
  topCorrector,
  resetInterpolationValues,
} from './interpolationValues';
import recalculateCurrentPage, { resetLastPage } from './recalculateCurrentPage';
import scrollController, { reCalcScrollLimits } from './scrollController';

let unmountAnimationsHandler = (): void => {};

const animationController = (state: State, dispatch: DispatchAPIAction): void => {
  let zoomUpdatedByApplyCSSProps = false;
  const interpolationValues = [
    scale,
    left,
    top,
    scroll,
    altScroll,
    zoom,
    leftCorrector,
    topCorrector,
  ];

  if (state.layout === LayoutTypes.Fixed) {
    zoom.target = state.zoom;
    zoom.current = state.zoom;
  }

  updateState({
    animate: false,
    animating: false,
  });

  const applyCSSProps = (): void => {
    const targetScale =
      state.layout === LayoutTypes.Flow
        ? Math.abs(scale.current)
        : Math.abs(scale.current * zoom.current);
    const computedScroll = scroll.current * targetScale;
    const computedAltScroll = altScroll.current * targetScale;
    const scrollLeft =
      left.current +
      leftCorrector.current +
      (state.scrollMode === 'horizontal' ? computedScroll : computedAltScroll);
    const scrollTop =
      top.current +
      topCorrector.current +
      (state.scrollMode === 'vertical' ? computedScroll : computedAltScroll);
    setCSSProperty('scale', `${targetScale}`);
    setCSSProperty('horizontal-translate', `${scrollLeft}px`);
    setCSSProperty('vertical-translate', `${scrollTop}px`);
    zoomUpdatedByApplyCSSProps = true;
    updateState({ scrollLeft, scrollTop, scale: targetScale, zoom: zoom.current });
    zoomUpdatedByApplyCSSProps = false;
  };

  const interpolateToTargetValues = (): void => {
    if (interpolationValues.filter((value) => interpolate(state, value)).length > 0) {
      applyCSSProps();
      // Execute the interpolation
      window.requestAnimationFrame(() => {
        recalculateCurrentPage(state, scroll.current, true);
        interpolateToTargetValues();
      });
    } else {
      applyCSSProps();
      if (state.scrollMode === 'horizontal' || state.scrollMode === 'vertical') {
        recalculateCurrentPage(state, scroll.current);
      }
      updateState({
        animating: false,
      });
      if (!state.dragging) {
        setCSSProperty('pointer-events', 'auto');
        setCSSProperty('user-select', 'auto');
      }
    }
  };

  const executeTransitions = (): void => {
    if (!state.animate) {
      interpolationValues.forEach((value) => {
        value.current = value.target;
      });
      applyCSSProps();
    } else if (
      interpolationValues.find((value) => value.forceUpdate || value.target !== value.current) &&
      !state.animating
    ) {
      updateState({
        animating: true,
      });
      interpolateToTargetValues();
    }
  };

  const onReadModeChangeEvent = (instant = false): void => {
    const newMargins = state.readMode
      ? { ...state.config.readModeMargin }
      : { ...state.config.uiModeMargin };
    if (!state.readMode && state.layout === LayoutTypes.Flow) {
      newMargins.bottom += state.fontSize * 3;
    }
    const currentWidth = state.containerWidth;
    const targetWidth = currentWidth - newMargins.left - newMargins.right;
    const currentHeight = state.containerHeight;
    const widthNeededScale = targetWidth / currentWidth;
    const targetHeight = currentHeight - newMargins.top - newMargins.bottom;
    const heightNeededScale = targetHeight / currentHeight;
    scale.target = Math.max(Math.min(widthNeededScale, heightNeededScale), 0);
    const widthReduction = currentWidth * (1 - scale.target);
    const marginWidth = widthReduction - newMargins.left - newMargins.right;
    left.target = newMargins.left + marginWidth / 2;

    const heightReduction = currentHeight * (1 - scale.target);
    const marginHeight = heightReduction - newMargins.top - newMargins.bottom;
    top.target = newMargins.top + marginHeight / 2;
    if (state.scrollMode === 'horizontal') {
      left.target = newMargins.left + marginWidth / 2;
    }
    if (state.scrollMode === 'vertical') {
      top.target = newMargins.top;
    }
    updateState({
      margin: newMargins,
    });
    if (instant) {
      left.current = left.target;
      top.current = top.target;
      scale.current = scale.target;
      scale.speed = 0;
      top.speed = 0;
      left.speed = 0;
      applyCSSProps();
    } else {
      executeTransitions();
    }
  };

  const resetPageProps = (): void => {
    const targetSlugScrollPosition = getScrollFromContentSlug(state) ?? 0;
    scroll.current = targetSlugScrollPosition;
    scroll.target = scroll.current;
    scroll.speed = 0;
    recalculateCurrentPage(state, scroll.current, true);
  };

  const onScrollModeChange = (): void => {
    setTimeout(() => {
      onReadModeChangeEvent(true);
      scroll.current = getScrollFromContentSlug(state) ?? 0;
      scroll.target = scroll.current;
      scroll.speed = 0;
      if (state.layout === LayoutTypes.Fixed) {
        reCalcScrollLimits(state);
      }
      applyCSSProps();
    }, 0);
  };

  const onContentSlugChanged = (slug: string): void => {
    const targetSlugScrollPosition = getScrollFromContentSlug(state, slug);
    if (targetSlugScrollPosition !== null && state.forceScroll === undefined) {
      scroll.target = targetSlugScrollPosition;
    }

    executeTransitions();
  };

  const resetPageScroll = (): void => {
    const scrollingElement = document.scrollingElement ?? document.body;
    scrollingElement.scrollTop = 0;
  };
  const onChapterChange = (): void => {
    resetPageScroll();
    if (state.layout === LayoutTypes.Fixed) {
      if (state.fitMode === FitMode.Height) {
        zoom.target = window.innerHeight / state.maxHeight;
      } else if (state.fitMode === FitMode.Width) {
        zoom.target = window.innerWidth / state.maxWidth;
      } else {
        zoom.target = state.zoom;
      }
      zoom.current = zoom.target;
    }
    resetPageProps();
    if (state.layout === LayoutTypes.Fixed) {
      reCalcScrollLimits(state, true);
    }
    applyCSSProps();
  };

  const onPositionBySlugChange = (): void => {
    if (state.layout === LayoutTypes.Fixed) {
      if (state.fitMode === FitMode.Height) {
        zoom.target = window.innerHeight / state.maxHeight;
      } else if (state.fitMode === FitMode.Width) {
        zoom.target = window.innerWidth / state.maxWidth;
      } else {
        zoom.target = state.zoom;
      }
      zoom.current = zoom.target;
      reCalcScrollLimits(state, true);
    }
    resetPageProps();
    applyCSSProps();
  };

  const onZoomChange = (): void => {
    if (!zoomUpdatedByApplyCSSProps && state.layout === LayoutTypes.Fixed) {
      zoom.target = state.zoom;
      zoom.current = zoom.target;
      zoom.forceUpdate = true;
      reCalcScrollLimits(state);
      executeTransitions();
    }
  };

  const onForceScrollChange = (newScroll: number | undefined): void => {
    if (newScroll !== undefined) {
      scroll.target = newScroll * -1;
      scroll.current = scroll.target;
      scroll.speed = 0;
      updateState({
        forceScroll: undefined,
      });
      executeTransitions();
    }
  };

  const onAnimateToScroll = (newScroll: number | undefined): void => {
    if (newScroll !== undefined) {
      scroll.target = newScroll * -1;
      updateState({
        animateToScroll: undefined,
      });
      executeTransitions();
    }
  };

  addOnChangeEventListener('forceScroll', onForceScrollChange);
  addOnChangeEventListener('animateToScroll', onAnimateToScroll);
  addOnChangeEventListener('zoom', onZoomChange);
  addOnChangeEventListener('chapterNumber', onChapterChange);
  addOnChangeEventListener('wrapperReady', onChapterChange);
  addOnChangeEventListener('fitMode', onChapterChange);
  addOnChangeEventListener('positionBySlug', onPositionBySlugChange);
  addOnChangeEventListener('contentSlug', onContentSlugChanged);
  addOnChangeEventListener('scrollMode', onScrollModeChange);
  addOnChangeEventListener('readMode', () => onReadModeChangeEvent());
  addOnChangeEventListener('containerWidth', () => onReadModeChangeEvent());
  addOnChangeEventListener('containerHeight', () => onReadModeChangeEvent());
  addOnChangeEventListener('fontSize', () => onReadModeChangeEvent());

  onReadModeChangeEvent(true);
  scrollController(state, dispatch, executeTransitions);
  updateState({
    animate: true,
    animating: false,
  });

  unmountAnimationsHandler = (): void => {
    resetLastPage();
    resetInterpolationValues();
    applyCSSProps();
  };
};

export const unmountAnimations = (): void => {
  unmountAnimationsHandler();
};

export default animationController;
