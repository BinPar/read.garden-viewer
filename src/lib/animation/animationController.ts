/* eslint-disable no-param-reassign */
import { DispatchAPIAction } from '../../model/apiInterface';
import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

import setCSSProperty from '../../utils/setCSSProperty';
import { updateState } from '../state';
import { addOnChangeEventListener } from '../state/stateChangeEvents';
import interpolate from './interpolate';
import { scale, left, top, scroll } from './interpolationValues';
import scrollController from './scrollController';

const animationController = (state: State, dispatch: DispatchAPIAction): void => {
  const interpolationValues = [scale, left, top, scroll];

  updateState({
    animate: false,
    animating: false,
  });

  const applyCSSProps = (): void => {
    setCSSProperty('scale', `${Math.abs(scale.current)}`);
    const scrollLeft = left.current + (state.scrollMode === 'horizontal' ? scroll.current : 0);
    setCSSProperty('horizontal-translate', `${scrollLeft}px`);
    const scrollTop = top.current + (state.scrollMode === 'vertical' ? scroll.current : 0);
    setCSSProperty('vertical-translate', `${scrollTop}px`);
    updateState({ scrollLeft, scrollTop, scale: scale.current });
  };

  const interpolateToTargetValues = (): void => {
    if (interpolationValues.filter((value) => interpolate(state, value)).length > 0) {
      applyCSSProps();
      // Execute the interpolation
      window.requestAnimationFrame(interpolateToTargetValues);
    } else {
      applyCSSProps();
      updateState({
        animating: false,
      });
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

  const onReadModeChangeEvent = (): void => {
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
      left.target -= scroll.current * (1 - scale.target);
    }    
    if (state.scrollMode === 'vertical') {
        top.target = newMargins.top - scroll.current * (1 - scale.target);
    }
    executeTransitions();
  };

  addOnChangeEventListener('readMode', onReadModeChangeEvent);
  addOnChangeEventListener('containerWidth', onReadModeChangeEvent);
  addOnChangeEventListener('containerHeight', onReadModeChangeEvent);
  addOnChangeEventListener('fontSize', onReadModeChangeEvent);
  onReadModeChangeEvent();
  scrollController(state, dispatch, scroll, executeTransitions);
  updateState({
    animate: true,
    animating: false,
  });
};

export default animationController;
