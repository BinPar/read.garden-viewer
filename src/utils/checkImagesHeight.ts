/**
 * Checks images height and provides special CSS class when image is higher than the available
 * vertical space. Also provides
 * @param images Node list of images (result from `querySelectorAll`)
 */
const checkImagesHeight = async (images: NodeListOf<HTMLImageElement>): Promise<void> => {
  const checkImagesHeightPromises = new Array<Promise<void>>();
  images.forEach((img) => {
    checkImagesHeightPromises.push(
      new Promise<void>((imageResolve) => {
        const check = (): void => {
          const { height: fullHeight } = img;
          const visibleHeight = img.getClientRects()[0]?.height;
          if (fullHeight || visibleHeight) {
            if (fullHeight > Math.ceil(visibleHeight)) {
              img.classList.add('rg-fit-height');
              /**
               * Needs to know available height (viewport height - vertical margins)
               * to work properly
               */
            }
            /**
             * TODO: img.classList.add('rg-ready');
             * Needs to know available width (column width without column gap)
             */
            imageResolve();
          } else {
            setTimeout(check, 10);
          }
        };
        check();
      }),
    );
  });
  await Promise.all(checkImagesHeightPromises);
};

export default checkImagesHeight;
