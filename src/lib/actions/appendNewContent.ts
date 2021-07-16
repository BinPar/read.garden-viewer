import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { AppendNewContent } from '../../model/actions/global';
import { GlobalState, ScrolledState, State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';

import setCSSProperty from '../../utils/setCSSProperty';
import checkImagesHeight from '../../utils/checkImagesHeight';
import recalculate from '../../viewer/recalculate';
import { onCssLoaded } from '../state/changeHandlers/cssLoaderHandler';
import { onWrapperReady } from '../state/changeHandlers/wrapperReadyHandler';
import { updateState } from '../state';
import layoutSetup from '../../viewer/layoutSetup';
import loadContentsInBackground from '../../utils/loadContentsInBackground';
import handleFlowCssAndLoad from '../../utils/handleFlowCssAndLoad';
import removeLayerHighlights from '../../utils/highlights/removeLayerHighlights';
import removeUserHighlights from '../../utils/highlights/removeUserHighlights';
import clearUserHighlights from '../../utils/highlights/clearUserHighlights';
import redrawUserHighlights from '../../utils/highlights/redrawUserHighlights';
import { highlightTerms } from '../../utils/highlights/search';
import handleAnchors from '../../utils/handleAnchors';

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
    const { contentPlaceholderNode, dynamicStyleNode, searchTermsHighlightsNode, config } = state;

    if (state.layout === LayoutTypes.Flow) {
      setCSSProperty('viewer-margin-top', '200vh');
      window.requestAnimationFrame(() => {
        if (searchTermsHighlightsNode) {
          removeLayerHighlights(searchTermsHighlightsNode);
        }
        removeUserHighlights(state);
        clearUserHighlights(state);
        contentPlaceholderNode!.innerHTML = action.htmlContent;
        contentPlaceholderNode!.dataset.highlighted = '';

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            let replace = true;
            const newLink = document.createElement('link');
            const done = async (): Promise<void> => {
              const recalculateState = await recalculate(state);
              handleAnchors(contentPlaceholderNode!, state);
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
              if (action.goToEnd) {
                const tempState = recalculateState as GlobalState & ScrolledState;
                if (state.scrollMode === 'horizontal') {
                  finalPartialState.forceScroll =
                    tempState.lastPosition - (tempState.lastPosition % tempState.containerWidth);
                } else {
                  finalPartialState.forceScroll = Math.max(
                    tempState.totalHeight + config.paddingTop - tempState.containerHeight,
                    0,
                  );
                }
              }
              resolve(finalPartialState);
              await redrawUserHighlights(state);
              highlightTerms(state.searchTerms);
            };
            const onStylesLoad = (): void => {
              newLink.removeEventListener('load', onStylesLoad);
              const checkFonts = () => {
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => {
                    const checkStatus = (): void => {
                      if (document.fonts.status === 'loaded') {
                        done();
                      } else {
                        setTimeout(checkStatus, 16);
                      }
                    };
                    checkStatus();
                  });
                });
              };
              const images = contentPlaceholderNode!.querySelectorAll('img');
              if (!images.length) {
                checkFonts();
                return;
              }
              Promise.all(Array.from(images).map((i) => checkImagesHeight([i]))).then(checkFonts);
            };
            if (!action.cssURL || action.cssURL === dynamicStyleNode!.href) {
              replace = false;
              onStylesLoad();
              return;
            }
            newLink.rel = 'stylesheet';
            newLink.type = 'text/css';
            newLink.addEventListener('load', onStylesLoad);
            dynamicStyleNode!.removeEventListener('load', onStylesLoad);
            dynamicStyleNode!.replaceWith(newLink);
            newLink.href = action.cssURL;
          });
        });
      });
    }

    if (state.layout === LayoutTypes.Fixed) {
      const { contentsBySlug } = state;
      const content = contentsBySlug.get(action.contentSlug)!;
      const { container } = content;
      content.html = action.htmlContent;
      content.cssURL = action.cssURL;
      container.classList.add('rg-loading');
      container!.innerHTML = action.htmlContent;

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const done = async (): Promise<void> => {
            container.classList.remove('rg-loading');
            handleAnchors(container!, state);
            setCSSProperty('viewer-margin-top', '0');
            const finalPartialState: Partial<State> = {
              slug: action.slug,
              cssLoaded: true,
            };
            if (state.loadingContent === action.contentSlug) {
              updateState({ loadingContent: '' });
              loadContentsInBackground(state);
            }
            resolve(finalPartialState);
            highlightTerms(state.searchTerms);
          };
          const checkFonts = () => {
            dynamicStyleNode!.removeEventListener('load', checkFonts);
            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(() => {
                const checkStatus = (): void => {
                  if (document.fonts.status === 'loaded') {
                    done();
                  } else {
                    setTimeout(checkStatus, 16);
                  }
                };
                checkStatus();
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
