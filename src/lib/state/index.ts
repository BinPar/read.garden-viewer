import { FixedState, FlowState, GlobalState, PaginatedState, ScrolledState, State } from '../../model/state';
import { getConfig } from '../../config';
import { InitialConfig } from '../../model/config';
import { ViewerMode } from '../../model/viewer';

let state: State;

export const initializeState = (config: InitialConfig): void => {
  const newConfig = {
    config: {
      ...getConfig(),
      ...config
    }
  };

  if (newConfig.config.layoutType === 'flow') {
    const newState: GlobalState & (FlowState & ScrolledState) = {
      config: newConfig.config,
    }
    state = newState;
  }

  if (newConfig.config.layoutType === 'fixed') {
    if (newConfig.config.defaultFixedMode === ViewerMode.Paginated) {
      const newState: GlobalState & (FixedState & PaginatedState) = {
        config: newConfig.config,
      }
      state = newState;
    }
    if (newConfig.config.defaultFixedMode === ViewerMode.WithScroll) {
      const newState: GlobalState & (FixedState & ScrolledState) = {
        config: newConfig.config,
      }
      state = newState;
    }
  }
}

export const getState = (): State => state;

export const updateState = (newState: Partial<State>): void => {
  const updatableState = state as any;
  Object.keys(newState).forEach(key => {
    updatableState[key] = (newState as any)[key];
  });
};
