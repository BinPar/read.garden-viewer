import log from 'loglevel';
import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { AppendNewContent } from '../../model/actions/global';
import { LayoutTypes, State } from '../../model/state';

import setCSSProperty from '../../utils/setCSSProperty';
import checkImagesHeight from '../../utils/checkImagesHeight';
import recalculate from '../../viewer/recalculate';
import { onCssLoaded } from '../state/changeHandlers/cssLoaderHandler';
import { onWrapperReady } from '../state/changeHandlers/wrapperReadyHandler';
import { getState, updateState } from '../state';
import layoutSetup from '../../viewer/layoutSetup';

/**
 * Appends new content to viewer
 * @param context.state Viewer state
 * @param context.action Viewer action, containing content HTML and CSS URL
 * @returns Partial state with updated properties
 */
const appendNewContent: ActionDispatcher<AppendNewContent> = async ({ state, action }) => {
  if (!state.wrapperReady || state.layout !== action.layout || action.slug !== state.slug) {
    updateState({ layout: action.layout, slug: action.slug });
    layoutSetup(getState());
    if (!getState().wrapperReady) {
      try {
        await onWrapperReady();
      } catch (ex) {
        return {};
      }
    }
  }
  if (!state.cssLoaded) {
    try {
      await onCssLoaded();
    } catch (ex) {
      return {};
    }
  }
  updateState({ cssLoaded: false });
  return new Promise<Partial<State>>((resolve): void => {
    const currentState = getState();
    const { contentPlaceholderNode, dynamicStyleNode } = currentState;
    setCSSProperty('viewer-margin-top', '200vh');
    window.requestAnimationFrame(() => {
      if (currentState.layout === LayoutTypes.Flow) {
        contentPlaceholderNode!.innerHTML = action.htmlContent;

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            let replace = true;
            const newLink = document.createElement('link');
            const done = async (): Promise<void> => {
              const recalculateState = await recalculate(getState());
              setCSSProperty('viewer-margin-top', '0');
              const finalPartialState: Partial<State> = {
                ...recalculateState,
                cssLoaded: true,
              };
              if (replace) {
                finalPartialState.dynamicStyleNode = newLink;
              }
              resolve(finalPartialState);
            };
            const onStylesLoad = (): void => {
              dynamicStyleNode!.removeEventListener('load', onStylesLoad);
              const checkFonts = () => {
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => {
                    if (document.fonts.status === 'loaded') {
                      dynamicStyleNode!.onload = null;
                      done();
                      return;
                    }
                    document.fonts.onloadingdone = () => {
                      dynamicStyleNode!.onload = null;
                      document.fonts.onloadingdone = null;
                      done();
                    };
                  });
                });
              };
              const images = contentPlaceholderNode!.querySelectorAll('img');
              if (!images.length) {
                checkFonts();
                return;
              }
              const promises = new Array<Promise<HTMLImageElement>>();
              images.forEach((img) => {
                promises.push(
                  new Promise<HTMLImageElement>((imageResolve) => {
                    if (img.complete) {
                      imageResolve(img);
                      return;
                    }
                    const onLoad = (): void => {
                      img.removeEventListener('load', onLoad);
                      imageResolve(img);
                    };
                    const onError = (ev: ErrorEvent) => {
                      log.info('Error loading image', ev.message);
                      onLoad();
                    };
                    img.addEventListener('load', onLoad);
                    img.addEventListener('error', onError);
                  }),
                );
              });
              Promise.all(promises).then(checkImagesHeight).then(checkFonts);
            };
            if (!action.cssURL || action.cssURL === dynamicStyleNode!.href) {
              replace = false;
              onStylesLoad();
              return;
            }
            newLink.rel = 'stylesheet';
            newLink.type = 'text/css';
            newLink.addEventListener('load', onStylesLoad);
            dynamicStyleNode!.replaceWith(newLink);
            newLink.href = action.cssURL;
          });
        });
      }

      if (currentState.layout === LayoutTypes.Fixed) {
        const { containerByLabel } = currentState;
        const container = containerByLabel.get(action.label);
        container!.innerHTML = action.htmlContent;

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            let replace = true;
            const newLink = document.createElement('link');
            const done = async (): Promise<void> => {
              const recalculateState = await recalculate(getState());
              setCSSProperty('viewer-margin-top', '0');
              const finalPartialState: Partial<State> = {
                ...recalculateState,
                cssLoaded: true,
              };
              if (replace) {
                finalPartialState.dynamicStyleNode = newLink;
              }
              resolve(finalPartialState);
            };
            const checkFonts = () => {
              dynamicStyleNode!.removeEventListener('load', checkFonts);
              window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                  if (document.fonts.status === 'loaded') {
                    dynamicStyleNode!.onload = null;
                    done();
                    return;
                  }
                  document.fonts.onloadingdone = () => {
                    dynamicStyleNode!.onload = null;
                    document.fonts.onloadingdone = null;
                    done();
                  };
                });
              });
            };
            if (!action.cssURL || action.cssURL === dynamicStyleNode!.href) {
              replace = false;
              checkFonts();
              return;
            }
            newLink.rel = 'stylesheet';
            newLink.type = 'text/css';
            newLink.addEventListener('load', checkFonts);
            dynamicStyleNode!.replaceWith(newLink);
            newLink.href = action.cssURL;
          });
        });
      }
    });
  });
};

export default appendNewContent;
