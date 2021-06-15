/**
 * Checks images height and provides special CSS class when image is higher than the available
 * vertical space. Also provides
 * @param images Node list of images (result from `querySelectorAll`)
 */
const checkImagesHeight = async (
  images: NodeListOf<HTMLImageElement> | HTMLImageElement[],
): Promise<void> => {
  const checkImagesHeightPromises = new Array<Promise<void>>();
  images.forEach((img: HTMLImageElement) => {
    checkImagesHeightPromises.push(
      new Promise<void>((imageResolve) => {
        let checkTimeout: NodeJS.Timeout | null = null;
        const securityTimeout = setTimeout(() => {
          if (checkTimeout) {
            clearTimeout(checkTimeout);
          }
          imageResolve();
        }, 5000);
        const check = (): void => {
          const { height: fullHeight, width: fullWidth } = img;
          const { height: visibleHeight } = img.getClientRects()[0] || { height: 0, width: 0 };
          if (fullHeight || visibleHeight) {
            clearTimeout(securityTimeout);
            if (fullHeight > Math.ceil(visibleHeight)) {
              img.classList.add('rg-fit-height');
            }
            const style = img.getAttribute('style');
            const newStyle = `${style || ''}${style ? ' ' : ''}--image-ratio: ${
              fullHeight / fullWidth
            }`;
            img.setAttribute('style', newStyle);
            img.classList.add('rg-ready');
            imageResolve();
          } else {
            checkTimeout = setTimeout(check, 10);
          }
        };
        check();
      }),
    );
  });
  await Promise.all(checkImagesHeightPromises);
};

export default checkImagesHeight;
