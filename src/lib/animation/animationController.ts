/* eslint-disable no-param-reassign */
import { DispatchAPIAction } from '../../model/actions/common';
import { State } from '../../model/state';
import { FitMode, LayoutTypes } from '../../model/viewerSettings';
import navigateToContentSlug from '../../utils/navigateToContentSlug';
import setCSSProperty from '../../utils/setCSSProperty';
import { updateState } from '../state';
import { addOnChangeEventListener } from '../state/stateChangeEvents';
import getMinAndMaxScroll from './getMinAndMaxScroll';
import getScrollFromContentSlug from './getScrollFromContentSlug';
import recalculateCurrentPage, { resetLastPage } from './recalculateCurrentPage';
import scrollController, { reCalcScrollLimits } from './scrollController';
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
    interpolationValues,
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
      (state.scrollMode === 'horizontal' || state.scrollMode === 'fixed'
        ? computedScroll
        : computedAltScroll);
    const scrollTop =
      top.current +
      topCorrector.current +
      (state.scrollMode === 'vertical' ? computedScroll : computedAltScroll);
    setCSSProperty('scale', `${targetScale}`);
    setCSSProperty('horizontal-translate', `${scrollLeft}px`);
    setCSSProperty('vertical-translate', `${scrollTop}px`);
    if (state.scrollerNode) {
      updateState({ updatingScroller: true });
      if (state.scrollMode === 'horizontal' && state.totalWidth) {
        state.scrollerNode.scrollLeft = -1 * scroll.current;
        setCSSProperty(
          'prev-chapter-navigation-opacity',
          state.scrollerNode.scrollLeft < state.containerWidth ? '1' : '0',
        );
        setCSSProperty(
          'next-chapter-navigation-opacity',
          state.scrollerNode.scrollLeft + state.containerWidth >
            state.scrollerNode.scrollWidth - state.containerWidth * 0.9
            ? '1'
            : '0',
        );
      }
      if (state.scrollMode === 'vertical' && state.totalHeight) {
        state.scrollerNode.scrollTop = -1 * scroll.current;
        setCSSProperty(
          'prev-chapter-navigation-opacity',
          state.scrollerNode.scrollTop < state.containerHeight ? '1' : '0',
        );
        setCSSProperty(
          'next-chapter-navigation-opacity',
          state.scrollerNode.scrollTop + state.containerHeight >
            state.scrollerNode.scrollHeight - state.containerHeight * 0.9
            ? '1'
            : '0',
        );
      }
      window.requestAnimationFrame(() => {
        if (state.updatingScroller) {
          updateState({ updatingScroller: false });
        }
      });
    }
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

  const executeTransitions = (instant = false): void => {
    if (!state.animate || instant) {
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
    const horizontalMargin = newMargins.left + newMargins.right;
    const targetWidth = currentWidth - horizontalMargin;
    const widthNeededScale = targetWidth / currentWidth;

    const currentHeight = state.containerHeight;
    const verticalMargin = newMargins.top + newMargins.bottom;
    const targetHeight = currentHeight - verticalMargin;
    const heightNeededScale = targetHeight / currentHeight;

    if (state.layout === LayoutTypes.Flow) {
      scale.target = Math.max(Math.min(widthNeededScale, heightNeededScale), 0);
    } else if (state.scrollMode !== 'fixed') {
      if (state.fitMode === FitMode.Height) {
        scale.target = Math.max(heightNeededScale, 0);
      }
      if (state.fitMode === FitMode.Width) {
        scale.target = Math.max(widthNeededScale, 0);
      }
    }

    if (state.scrollMode === 'horizontal') {
      left.target = newMargins.left;
      const heightReduction = currentHeight * (1 - scale.target);
      const marginHeight = heightReduction - newMargins.top - newMargins.bottom;
      top.target = newMargins.top + marginHeight / 2;
    }

    if (state.scrollMode === 'vertical') {
      top.target = newMargins.top;
      const widthReduction = currentWidth * (1 - scale.target);
      const marginWidth = widthReduction - newMargins.left - newMargins.right;
      left.target = newMargins.left + marginWidth / 2;
    }

    if (state.scrollMode === 'fixed') {
      if (state.maxWidth && state.maxHeight) {
        const realContentsWidth = state.maxWidth * scale.target * zoom.target;
        const availableWidth = window.innerWidth - (state.margin.left + state.margin.right);
        left.target = state.margin.left - (realContentsWidth - availableWidth) / 2;
        const realContentsHeight = state.maxHeight * scale.target * zoom.target;
        const availableHeight = window.innerHeight - (state.margin.top + state.margin.bottom);
        top.target = state.margin.top - (realContentsHeight - availableHeight) / 2;
      }
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

    setCSSProperty('scroller-left', `${state.margin.left}px`);
    setCSSProperty('scroller-scale', `${scale.target}`);
  };

  const resetPageProps = (): void => {
    if (!state.avoidReset) {
      const targetSlugScrollPosition = getScrollFromContentSlug(state) ?? 0;
      scroll.target = targetSlugScrollPosition;
      scroll.current = scroll.target;
      scroll.speed = 0;
      recalculateCurrentPage(state, scroll.current, true);
    }
  };

  const onScrollModeChange = (): void => {
    setTimeout(() => {
      onReadModeChangeEvent(true);
      scroll.current = getScrollFromContentSlug(state) ?? 0;
      scroll.target = scroll.current;
      scroll.speed = 0;
      if (state.layout === LayoutTypes.Fixed) {
        reCalcScrollLimits(state, true);
      }
      applyCSSProps();
    }, 0);
  };

  const onContentSlugChanged = (slug: string): void => {
    if (state.scrollMode === 'fixed') {
      recalculateCurrentPage(state, scroll.current, true);
    } else {
      const targetSlugScrollPosition = getScrollFromContentSlug(state, slug);
      if (targetSlugScrollPosition !== null && state.forceScroll === undefined) {
        const scrollLimits = getMinAndMaxScroll(state);
        if (targetSlugScrollPosition > scrollLimits.maxScroll) {
          scroll.target = scrollLimits.maxScroll;
          scroll.forceUpdate = true;
        } else if (targetSlugScrollPosition < scrollLimits.minScroll) {
          scroll.target = scrollLimits.minScroll;
          scroll.forceUpdate = true;
        } else {
          scroll.target = targetSlugScrollPosition;
        }
      }
      executeTransitions();
      scroll.forceUpdate = false;
    }
  };

  const resetPageScroll = (): void => {
    const scrollingElement = document.scrollingElement ?? document.body;
    scrollingElement.scrollTop = 0;
  };

  const fitHeight = (): void => {
    if (state.layout === LayoutTypes.Fixed) {
      top.target = state.margin.top;

      if (state.scrollMode === 'fixed') {
        zoom.target =
          (state.containerHeight / state.maxHeight) *
          Math.max(
            0,
            (state.containerHeight - (state.margin.top + state.margin.bottom)) /
              state.containerHeight,
          );
        const realContentsWidth = state.maxWidth * scale.target * zoom.target;
        const availableWidth = window.innerWidth - (state.margin.left + state.margin.right);
        left.target = state.margin.left - (realContentsWidth - availableWidth) / 2;
      } else {
        zoom.target = state.containerHeight / state.maxHeight;
        scale.target = Math.max(
          0,
          (state.containerHeight - (state.margin.top + state.margin.bottom)) /
            state.containerHeight,
        );
        if (state.scrollMode === 'horizontal') {
          left.target = state.margin.left;
        }
        if (state.scrollMode === 'vertical') {
          const widthReduction = state.containerWidth * (1 - scale.target);
          const marginWidth = widthReduction - state.margin.left - state.margin.right;
          left.target = state.margin.left + marginWidth / 2;
        }
      }
    }
  };

  const fitWidth = (): void => {
    if (state.layout === LayoutTypes.Fixed) {
      left.target = state.margin.left;

      if (state.scrollMode === 'fixed') {
        zoom.target =
          (state.containerWidth / state.maxWidth) *
          Math.max(
            0,
            (state.containerWidth - state.margin.left - state.margin.right) / state.containerWidth,
          );
        const realContentsHeight = state.maxHeight * scale.target * zoom.target;
        const availableHeight = window.innerHeight - (state.margin.top + state.margin.bottom);
        top.target = state.margin.top - (realContentsHeight - availableHeight) / 2;
      } else {
        zoom.target = state.containerWidth / state.maxWidth;
        scale.target = Math.max(
          0,
          (state.containerWidth - state.margin.left - state.margin.right) / state.containerWidth,
        );
        if (state.scrollMode === 'vertical') {
          top.target = state.margin.top;
        }
        if (state.scrollMode === 'horizontal') {
          const heightReduction = state.containerHeight * (1 - scale.target);
          const marginHeight = heightReduction - state.margin.top - state.margin.bottom;
          top.target = state.margin.top + marginHeight / 2;
        }
      }
    }
  };

  const onChapterChange = (): void => {
    resetPageScroll();
    if (state.layout === LayoutTypes.Fixed) {
      if (state.fitMode === FitMode.Height) {
        fitHeight();
      } else if (state.fitMode === FitMode.Width) {
        fitWidth();
      } else if (state.fitMode === FitMode.Page) {
        const fitWidthZoom = Math.max(
          0,
          (state.containerWidth - state.margin.left - state.margin.right) / state.containerWidth,
        );
        const fitHeightZoom = Math.max(
          0,
          (state.containerHeight - state.margin.top - state.margin.bottom) / state.containerHeight,
        );
        if (fitWidthZoom < fitHeightZoom) {
          fitWidth();
        } else {
          fitHeight();
        }
        navigateToContentSlug(state.contentSlug);
      } else {
        zoom.target = state.zoom;
        if (state.scrollMode === 'fixed') {
          onReadModeChangeEvent(true);
        }
      }
      scale.current = scale.target;
      zoom.current = zoom.target;
      top.current = top.target;
      left.current = left.target;
    }
    resetPageProps();
    if (state.layout === LayoutTypes.Fixed) {
      reCalcScrollLimits(state, true);
    }
    applyCSSProps();
  };

  const onPositionBySlugChange = (): void => {
    if (state.layout === LayoutTypes.Fixed && state.scrollMode !== 'fixed') {
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
      if (state.scrollMode === 'fixed') {
        const realContentsWidth = state.maxWidth * scale.target * zoom.target;
        const availableWidth = window.innerWidth - (state.margin.left + state.margin.right);
        left.target = state.margin.left - (realContentsWidth - availableWidth) / 2;
        left.current = left.target;
        const realContentsHeight = state.maxHeight * scale.target * zoom.target;
        const availableHeight = window.innerHeight - (state.margin.top + state.margin.bottom);
        top.target = state.margin.top - (realContentsHeight - availableHeight) / 2;
        top.current = top.target;
      }
      reCalcScrollLimits(state, true);
      executeTransitions();
      zoom.forceUpdate = false;
    }
  };

  const onForceScrollChange = (newScroll: number | undefined): void => {
    if (newScroll !== undefined) {
      scroll.target = newScroll * -1;
      scroll.current = scroll.target;
      scroll.speed = 0;
      scroll.forceUpdate = true;
      updateState({
        forceScroll: undefined,
      });
      executeTransitions();
      scroll.forceUpdate = false;
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
