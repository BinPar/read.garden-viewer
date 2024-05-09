import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { AppendNewContent } from '../../model/actions/global';
import { GlobalState, ScrolledState, State } from '../../model/state';
import { LayoutTypes } from '../../model/viewerSettings';
import { ContentLoaded } from '../../model/events';

import setCSSProperty from '../../utils/setCSSProperty';
import checkImagesHeight from '../../utils/checkImagesHeight';
import recalculate from '../../viewer/recalculate';
import { onCssLoaded } from '../state/changeHandlers/cssLoaderHandler';
import { onWrapperReady } from '../state/changeHandlers/wrapperReadyHandler';
import { updateState } from '../state';
import layoutSetup from '../../viewer/layoutSetup';
import loadContentsInBackground from '../../utils/loadContentsInBackground';
import handleFlowCssAndLoad from '../../utils/handleFlowCssAndLoad';
import removeUserHighlights from '../../utils/highlights/removeUserHighlights';
import clearUserHighlights from '../../utils/highlights/clearUserHighlights';
import redrawUserHighlights from '../../utils/highlights/redrawUserHighlights';
import { highlightTerms, clean } from '../../utils/highlights/search';
import handleAnchors from '../../utils/handleAnchors';
import checkSvgImagesHeight from '../../utils/checkSvgImagesHeight';

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
    const { contentPlaceholderNode, dynamicStyleNode, config } = state;

    if (state.layout === LayoutTypes.Flow) {
      setCSSProperty('viewer-margin-top', '200vh');
      window.requestAnimationFrame(() => {
        clean(state);
        removeUserHighlights(state);
        clearUserHighlights(state);

        if (contentPlaceholderNode) {
          contentPlaceholderNode.innerHTML = action.htmlContent;
          contentPlaceholderNode.dataset.highlighted = '';

          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              let replace = true;
              const newLink = document.createElement('link');
              const done = async (): Promise<void> => {
                const recalculateState = await recalculate(state);
                handleAnchors(contentPlaceholderNode, state);
                setCSSProperty('viewer-margin-top', '0');
                const finalPartialState: Partial<State> = {
                  ...recalculateState,
                  layout: LayoutTypes.Flow,
                  scrollMode: state.scrollMode,
                  slug: action.slug,
                  contentSlug: action.contentSlug,
                  chapterNumber: action.chapterNumber,
                  visibleContents: [action.contentSlug],
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
                if (state.config.eventHandler) {
                  const event: ContentLoaded = {
                    type: 'contentLoaded',
                    contentSlug: action.contentSlug,
                    slug: action.slug,
                    productSlug: state.productSlug,
                  };
                  state.config.eventHandler(event).catch((ex) => {
                    const { stack, message } = ex as Error;
                    console.error('Error at event handler', stack || message);
                  });
                }
                await redrawUserHighlights(state);
                setTimeout((): void => {
                  highlightTerms(state.searchTerms);
                }, 0);
              };
              const onStylesLoad = (): void => {
                newLink.removeEventListener('load', onStylesLoad);
                newLink.removeEventListener('error', onStylesLoad);
                const checkFonts = (): void => {
                  window.requestAnimationFrame(() => {
                    window.requestAnimationFrame(() => {
                      const checkStatus = (): void => {
                        if (document.fonts.status === 'loaded') {
                          done().catch((ex) => {
                            const { stack, message } = ex as Error;
                            console.error('Error at styles loaded', stack || message);
                          });
                        } else {
                          setTimeout(checkStatus, 16);
                        }
                      };
                      checkStatus();
                    });
                  });
                };
                const images = contentPlaceholderNode.querySelectorAll('img');
                if (!images.length) {
                  checkFonts();
                  return;
                }
                const svgImages =
                  contentPlaceholderNode.querySelectorAll<SVGImageElement>('svg image');
                if (svgImages.length) {
                  Array.from(svgImages).map((i) => checkSvgImagesHeight([i], state));
                }
                Promise.all(Array.from(images).map((i) => checkImagesHeight([i], state)))
                  .then(checkFonts)
                  .catch((ex) => {
                    const { stack, message } = ex as Error;
                    console.error('Error checking images', stack || message);
                  });
              };
              if (!action.cssURL || action.cssURL === dynamicStyleNode!.href) {
                replace = false;
                onStylesLoad();
                return;
              }
              newLink.rel = 'stylesheet';
              newLink.type = 'text/css';
              newLink.addEventListener('load', onStylesLoad);
              newLink.addEventListener('error', onStylesLoad);
              dynamicStyleNode!.removeEventListener('load', onStylesLoad);
              dynamicStyleNode!.removeEventListener('error', onStylesLoad);
              dynamicStyleNode!.replaceWith(newLink);
              newLink.href = action.cssURL;
            });
          });
        }
      });
    }

    if (state.layout === LayoutTypes.Fixed) {
      const { contentsBySlug } = state;
      const content = contentsBySlug.get(action.contentSlug)!;
      if (!content) {
        console.warn(`Something went wrong, no content for slug: ${action.contentSlug}`);
      }
      const { container } = content;
      content.html = action.htmlContent;
      content.cssURL = action.cssURL;
      container.classList.add('rg-loading');
      container.innerHTML = action.htmlContent;

      setTimeout(() => {
        const done = (): void => {
          container.classList.remove('rg-loading');
          setCSSProperty('viewer-margin-top', '0');
          handleAnchors(container, state);
          const finalPartialState: Partial<State> = {
            slug: action.slug,
            cssLoaded: true,
          };
          if (state.loadingContent === action.contentSlug) {
            updateState({ loadingContent: '' });
            loadContentsInBackground(state);
          }
          resolve(finalPartialState);
          if (state.config.eventHandler) {
            const event: ContentLoaded = {
              type: 'contentLoaded',
              contentSlug: action.contentSlug,
              slug: action.slug,
              productSlug: state.productSlug,
            };
            state.config.eventHandler(event).catch((ex) => {
              const { stack, message } = ex as Error;
              console.error('Error at event handler', stack || message);
            });
          }
          setTimeout((): void => {
            highlightTerms(state.searchTerms);
          }, 0);
        };
        const checkFonts = (): void => {
          dynamicStyleNode!.removeEventListener('load', checkFonts);
          setTimeout(() => {
            const checkStatus = (): void => {
              if (document.fonts.status === 'loaded') {
                done();
              } else {
                setTimeout(checkStatus, 16);
              }
            };
            checkStatus();
          }, 0);
        };
        if (!action.cssURL) {
          checkFonts();
          return;
        }
        handleFlowCssAndLoad(action.cssURL, checkFonts);
      }, 0);
    }
  });
};

export default appendNewContent;
