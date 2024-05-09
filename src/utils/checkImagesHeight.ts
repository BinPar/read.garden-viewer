import { State } from '../model';

/**
 * Checks images height and provides special CSS class when image is higher than the available
 * vertical space. Also provides image ratio to keep proportion
 * @param images Node list or array of HTMLImageElement
 * @param state Viewer state
 */
const checkImagesHeight = async (
  images: NodeListOf<HTMLImageElement> | HTMLImageElement[],
  state: State,
): Promise<void> => {
  const checkImagesHeightPromises = new Array<Promise<void>>();
  images.forEach((img: HTMLImageElement) => {
    checkImagesHeightPromises.push(
      new Promise<void>((resolve) => {
        const securityTimeout = setTimeout(() => {
          console.warn('Image without width', img);
          resolve();
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
          resolve();
        };
        clone.onload = onLoad;
        clone.src = img.src;
      }),
    );
  });
  await Promise.all(checkImagesHeightPromises);
};

export default checkImagesHeight;
