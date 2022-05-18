import { LayoutTypes } from '../model/viewerSettings';

import { getState } from '../lib/state';

/**
 * Handles contents CSS urls and waits for load before calling provided callback
 * @param url CSS url
 * @param callback Callback that will be called after CSS are handled and loaded
 */
const handleFlowCssAndLoad = (url: string, callback: () => any): void => {
  const state = getState();
  if (state.layout === LayoutTypes.Flow) {
    throw new Error('No need for CSS special handler in flow layout');
  }
  if (state.loadedCssUrls.has(url)) {
    callback();
    return;
  }
  console.log(`Loading CSS ${url}`);
  state.loadedCssUrls.add(url);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  const onLoad = (): void => {
    console.log('onLoad!');
    link.removeEventListener('load', onLoad);
    callback();
  };
  link.addEventListener('load', onLoad);
  link.addEventListener('ended', () => {
    console.log('ended!');
  });
  link.addEventListener('error', (e) => {
    console.log({ error: '', e: console.dir(e), });
    callback();
  });
  link.addEventListener('abort', () => {
    console.log('Abort!');
  });
  document.head.appendChild(link);
  state.fixedStylesNodes.push(link);
  link.href = url;
};

export default handleFlowCssAndLoad;
