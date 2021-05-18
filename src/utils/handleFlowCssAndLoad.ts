import { getState } from '../lib/state';
import { LayoutTypes } from '../model/state';

const handleFlowCssAndLoad = (url: string, callback: () => any): void => {
  const state = getState();
  if (state.layout === LayoutTypes.Flow) {
    throw new Error('No need for CSS special handler in flow layout');
  }
  const { loadedCssUrls } = state;
  if (loadedCssUrls.has(url)) {
    callback();
  }
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  const onLoad = () => {
    link.removeEventListener('load', onLoad);
    callback();
  };
  link.addEventListener('load', onLoad);
  document.head.appendChild(link);
  link.href = url;
};

export default handleFlowCssAndLoad;
