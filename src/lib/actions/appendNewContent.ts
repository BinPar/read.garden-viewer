import log from 'loglevel';

import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { AppendNewContent } from '../../model/actions/global';
import { State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

import setCSSProperty from '../../utils/setCSSProperty';
import checkImagesHeight from '../../utils/checkImagesHeight';
import recalculate from '../../viewer/recalculate';
import { onCssLoaded } from '../state/changeHandlers/cssLoaderHandler';
import { onWrapperReady } from '../state/changeHandlers/wrapperReadyHandler';
import { updateState } from '../state';
import layoutSetup from '../../viewer/layoutSetup';
import { drawHighlights } from '../../utils/highlights';
import { highlightTerms } from '../../utils/highlights/search';
import loadContentsInBackground from '../../utils/loadContentsInBackground';
import handleFlowCssAndLoad from '../../utils/handleFlowCssAndLoad';

/**
 * Appends new content to viewer
 * @param context.state Viewer state
 * @param context.action Viewer action, containing content HTML and CSS URL
 * @returns Partial state with updated properties
 */
const appendNewContent: ActionDispatcher<AppendNewContent> = async ({ state, action }) => {
  if (!state.wrapperReady || state.layout !== action.layout || action.slug !== state.slug) {
    updateState({ layout: action.layout, slug: action.slug });
    layoutSetup(state);
    if (!state.wrapperReady) {
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
    const { contentPlaceholderNode, dynamicStyleNode, searchTermsHighlightsNode } = state;

    if (state.layout === LayoutTypes.Flow) {
      setCSSProperty('viewer-margin-top', '200vh');
      window.requestAnimationFrame(() => {
        drawHighlights(searchTermsHighlightsNode!);
        contentPlaceholderNode!.innerHTML = action.htmlContent;

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            let replace = true;
            const newLink = document.createElement('link');
            const done = async (): Promise<void> => {
              const recalculateState = await recalculate(state);
              setCSSProperty('viewer-margin-top', '0');
              const finalPartialState: Partial<State> = {
                ...recalculateState,
                layout: LayoutTypes.Flow,
                scrollMode: state.scrollMode,
                slug: action.slug,
                contentSlug: action.contentSlug,
                chapterNumber: action.chapterNumber,
                cssLoaded: true,
              };
              if (replace) {
                finalPartialState.dynamicStyleNode = newLink;
              }
              resolve(finalPartialState);
              highlightTerms(state.searchTerms);
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
      });
    }

    if (state.layout === LayoutTypes.Fixed) {
      const { contentsByLabel } = state;
      const content = contentsByLabel.get(action.label)!;
      const { container } = content;
      content.html = action.htmlContent;
      content.cssURL = action.cssURL;
      container.classList.add('rg-loading');
      container!.innerHTML = action.htmlContent;

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const done = async (): Promise<void> => {
            container.classList.remove('rg-loading');
            const recalculateState = await recalculate(state);
            setCSSProperty('viewer-margin-top', '0');
            const finalPartialState: Partial<State> = {
              ...recalculateState,
              slug: action.slug,
              contentSlug: action.contentSlug,
              cssLoaded: true,
            };
            updateState({ loadingContent: false });
            resolve(finalPartialState);
            loadContentsInBackground();
            highlightTerms(state.searchTerms);
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
          if (!action.cssURL) {
            checkFonts();
            return;
          }
          handleFlowCssAndLoad(action.cssURL, checkFonts);
        });
      });
    }
  });
};

export default appendNewContent;
