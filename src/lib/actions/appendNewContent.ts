import { ActionDispatcher } from '../../model/actions/actionDispatcher';
import { AppendNewContent } from '../../model/actions/global';
import { State } from '../../model/state';

import setCSSProperty from '../../utils/setCSSProperty';

const appendNewContent: ActionDispatcher<AppendNewContent> = async (
  action,
  state,
) =>
  new Promise<Partial<State>>((resolve): void => {
    const {
      contentPlaceholderNode,
      dynamicStyleNode,
    } = state as Required<State>;

    setCSSProperty('viewer-margin-top', '200vh');
    window.requestAnimationFrame(() => {
      const parser = new DOMParser();
      const element = parser.parseFromString(action.htmlContent, 'text/html')
        .body.firstChild as HTMLDivElement;
      contentPlaceholderNode.replaceWith(element);
      const partialState: Partial<State> = {
        cssLoaded: true,
        contentPlaceholderNode: element,
      };

      window.requestAnimationFrame(() => {
        const done = () => {
          resolve(partialState);
          setCSSProperty('viewer-margin-top', '0');
        };
        if (!action.cssURL || action.cssURL === dynamicStyleNode.href) {
          done();
          return;
        }
        dynamicStyleNode.onload = (): void => {
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
          const images = element.querySelectorAll('img');
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
          Promise.all(promises).then(checkFonts);
        };
        dynamicStyleNode.href = action.cssURL;
      });
    });
  });

export default appendNewContent;
