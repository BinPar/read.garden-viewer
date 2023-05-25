import log from 'loglevel';

import { State } from '../model';

// const getApplyingProperties = (
//   element: HTMLImageElement,
//   sheet?: CSSStyleSheet | null,
// ): Set<string> => {
//   const res = new Set<string>();
//   if (!sheet) {
//     return res;
//   }
//   const rules = sheet.cssRules;
//   for (let i = 0, l = rules.length; i < l; i++) {
//     const { cssText, selectorText } = rules[i] as CSSStyleRule;
//     if (selectorText && element.matches(selectorText)) {
//       const match = cssText.match(/{([^}]+)}/);
//       if (match && match[1]) {
//         match[1].split(';').forEach((item) => {
//           const [property] = item.split(':');
//           if (property && property.trim()) {
//             res.add(property.trim().toLowerCase());
//           }
//         });
//       }
//     }
//   }
//   return res;
// };

/**
 * Checks images height and provides special CSS class when image is higher than the available
 * vertical space. Also provides
 * @param images Node list of images (result from `querySelectorAll`)
 */
const checkImagesHeight = async (
  images: NodeListOf<HTMLImageElement> | HTMLImageElement[],
  state: State,
): Promise<void> => {
  const checkImagesHeightPromises = new Array<Promise<void>>();
  images.forEach((img: HTMLImageElement) => {
    checkImagesHeightPromises.push(
      new Promise<void>((imageResolve) => {
        const securityTimeout = setTimeout(() => {
          log.info('Image without width', img);
          imageResolve();
        }, 2000);
        const clone = new Image();
        const onLoad = (): void => {
          const { height: fullHeight, width: fullWidth } = clone;
          const visibleHeight = img.getClientRects()[0]?.height;
          clearTimeout(securityTimeout);
          img.classList.remove('rg-fit-height');
          if (visibleHeight) {
            const containerHeight =
              state.containerHeight - (state.config.paddingBottom + state.config.paddingTop);
            if (visibleHeight >= containerHeight * 0.95) {
              img.classList.add('rg-fit-height');
            }
          }
          if (fullHeight) {
            // eslint-disable-next-line no-param-reassign
            img.style.setProperty('--image-ratio', `${fullHeight / fullWidth}`);
          }
          img.classList.add('rg-ready');
          imageResolve();
        };
        clone.onload = onLoad;
        clone.src = img.src;
      }),
    );
  });
  await Promise.all(checkImagesHeightPromises);
};

export default checkImagesHeight;
