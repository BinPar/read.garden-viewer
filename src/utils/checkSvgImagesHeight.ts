import { State } from '../model';

/**
 * Checks SVG images height and provides special CSS class when image is higher than available
 * vertical space. Also provides image ratio to keep proportion
 * @param images Node list or array of SVGImageElement (images inside SVGs)
 * @param state Viewer state
 */
const checkSvgImagesHeight = async (
  images: NodeListOf<SVGImageElement> | SVGImageElement[],
  state: State,
): Promise<void> => {
  const checkImagesHeightPromises = new Array<Promise<void>>();
  images.forEach((image: SVGImageElement) => {
    checkImagesHeightPromises.push(
      new Promise<void>((resolve) => {
        if (image.ownerSVGElement) {
          const width = image.width.baseVal.value;
          const height = image.height.baseVal.value;
          const visibleHeight = image.getClientRects()[0]?.height;
          image.ownerSVGElement.classList.remove('rg-fit-height');
          if (visibleHeight) {
            const containerHeight =
              state.containerHeight - (state.config.paddingBottom + state.config.paddingTop);
            if (visibleHeight >= containerHeight * 0.95) {
              image.ownerSVGElement.classList.add('rg-fit-height');
            }
          }
          if (height && width) {
            image.ownerSVGElement.style.setProperty('--image-ratio', `${height / width}`);
          }
          image.ownerSVGElement.classList.add('rg-ready');
          resolve();
        }
      }),
    );
  });
  await Promise.all(checkImagesHeightPromises);
};

export default checkSvgImagesHeight;
