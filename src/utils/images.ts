export const preloadImages = (
  images: { [key: string]: string }, // Object containing image URLs
  callback: (loadedImages: { [key: string]: HTMLImageElement }) => void // Callback after images are loaded
): { [key: string]: HTMLImageElement } => {
  let imagesLoaded = 0;
  const totalImagesToLoad = Object.keys(images).length;
  const loadedImages: { [key: string]: HTMLImageElement } = {};

  for (const src in images) {
    if (Object.prototype.hasOwnProperty.call(images, src)) {
      loadedImages[src] = new Image();

      loadedImages[src].onload = function () {
        if (++imagesLoaded === totalImagesToLoad) {
          callback(loadedImages); // Invoke callback with loaded images
        }
      };
      loadedImages[src].src = images[src];
    }
  }

  return loadedImages;
};

export const getAspectRatioData = (
  image: HTMLImageElement,
  width: number,
  height: number
): {
  xOffset: number;
  yOffset: number;
  newWidth: number;
  newHeight: number;
} => {
  const imageWidth = image.naturalWidth;
  const imageHeight = image.naturalHeight;

  // Calculate the aspect ratio and new size
  const aspectRatio = imageWidth / imageHeight;

  let newWidth, newHeight;

  // Adjust image size based on canvas size, maintaining aspect ratio
  if (width / height > aspectRatio) {
    newHeight = height;
    newWidth = newHeight * aspectRatio;
  } else {
    newWidth = width;
    newHeight = newWidth / aspectRatio;
  }

  // Calculate the position to center the image on the canvas
  const xOffset = (width - newWidth) / 2;
  const yOffset = (height - newHeight) / 2;

  return { xOffset, yOffset, newWidth, newHeight };
};
