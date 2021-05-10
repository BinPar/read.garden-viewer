import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { AppendNewContent } from '../../model/actions/global';
import { State } from '../../model/state';

import setCSSProperty from '../../utils/setCSSProperty';
import checkImagesHeight from '../../utils/checkImagesHeight';
import recalculate from '../../viewer/recalculate';

/**
 * Appends new content to viewer
 * @param context.state Viewer state
 * @param context.action Viewer action, containing content HTML and CSS URL
 * @returns Partial state with updated properties
 */
const appendNewContent: ActionDispatcher<AppendNewContent> = async ({ state, action }) =>
  new Promise<Partial<State>>((resolve): void => {
    const { contentPlaceholderNode, dynamicStyleNode } = state as Required<State>;

    setCSSProperty('viewer-margin-top', '200vh');
    window.requestAnimationFrame(() => {
      contentPlaceholderNode.innerHTML = action.htmlContent;
      const endingGap = document.createElement('div');
      endingGap.classList.add('rg-ending-gap');
      contentPlaceholderNode.appendChild(endingGap);

      window.requestAnimationFrame(() => {
        let replace = true;
        const newLink = document.createElement('link');
        const done = async (): Promise<void> => {
          const recalculateState = await recalculate(state);
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
        if (!action.cssURL || action.cssURL === dynamicStyleNode.href) {
          replace = false;
          done();
          return;
        }
        const onStylesLoad = (): void => {
          dynamicStyleNode.removeEventListener('load', onStylesLoad);
          const checkFonts = () => {
            if (document.fonts.status === 'loaded') {
              dynamicStyleNode.onload = null;
              done();
              return;
            }
            document.fonts.onloadingdone = () => {
              dynamicStyleNode.onload = null;
              document.fonts.onloadingdone = null;
              done();
            };
          };
          const images = contentPlaceholderNode.querySelectorAll('img');
          if (!images.length) {
            checkFonts();
            return;
          }
          const promises = new Array<Promise<void>>();
          images.forEach((img) => {
            promises.push(
              new Promise<void>((imageResolve) => {
                if (img.complete) {
                  imageResolve();
                  return;
                }
                const onLoad = (): void => {
                  img.removeEventListener('load', onLoad);
                  imageResolve();
                };
                const onError = (ev: ErrorEvent) => {
                  // eslint-disable-next-line no-console
                  console.log('Error loading image', ev.message);
                  onLoad();
                };
                img.addEventListener('load', onLoad);
                img.addEventListener('error', onError);
              }),
            );
          });
          Promise.all(promises)
            .then(() => checkImagesHeight(images))
            .then(checkFonts);
        };
        newLink.rel = 'stylesheet';
        newLink.type = 'text/css';
        newLink.addEventListener('load', onStylesLoad);
        dynamicStyleNode.replaceWith(newLink);
        newLink.href = action.cssURL;
      });
    });
  });

export default appendNewContent;
