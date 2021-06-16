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
        const securityTimeout = setTimeout(() => {
          console.warn('Image without width', img);
          imageResolve();
        }, 2000);
        const clone = new Image();
        const onLoad = (): void => {
          const { height: fullHeight, width: fullWidth } = clone;
          const visibleHeight = img.getClientRects()[0]?.height;
          clearTimeout(securityTimeout);
          if (visibleHeight && fullHeight > Math.ceil(visibleHeight)) {
            img.classList.add('rg-fit-height');
          }
          if (fullHeight) {
            const style = img.getAttribute('style');
            const newStyle = `${style || ''}${style ? '; ' : ''}--image-ratio: ${
              fullHeight / fullWidth
            }`;
            img.setAttribute('style', newStyle);
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
