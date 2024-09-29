import { useEffect, useLayoutEffect, useRef } from "react";

import { preloadImages } from "@/utils/images";
import { ASCIIEffect } from "@/utils/imageEffects";

import { ASCIIEffectForm } from "@/types/effectsOptions";

const ASCIICanvas = ({
  width,
  height,
  formData,
  downloadFile,
  resetFileDownload,
}: {
  width: number;
  height: number;
  formData: ASCIIEffectForm;
  downloadFile: {
    canDownload: boolean;
    fileName: string;
    fileFormat: string;
  };
  resetFileDownload: () => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesPreloaded = useRef(false);
  const imagesRef = useRef<{ [key: string]: HTMLImageElement | undefined }>({});

  useLayoutEffect(() => {
    if (canvasRef.current !== null) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      imagesRef.current = preloadImages(
        { image: formData.imageUrl },
        function (images) {
          const image = images[`image`];

          const availableWidth = width - 100; // 50px padding on left and right
          const availableHeight = height - 100; // 50px padding on top and bottom

          // Image's intrinsic dimensions
          const imageWidth = image.naturalWidth;
          const imageHeight = image.naturalHeight;

          // Calculate the image's aspect ratio
          const imageAspectRatio = imageWidth / imageHeight;

          let newWidth, newHeight;

          // Adjust canvas size based on the image's aspect ratio
          if (imageWidth > availableWidth || imageHeight > availableHeight) {
            // If the image is larger than the available space, scale it down
            if (availableWidth / availableHeight > imageAspectRatio) {
              newHeight = availableHeight;
              newWidth = newHeight * imageAspectRatio;
            } else {
              newWidth = availableWidth;
              newHeight = newWidth / imageAspectRatio;
            }
          } else {
            // If the image is smaller, scale it up while maintaining aspect ratio
            if (availableWidth / availableHeight > imageAspectRatio) {
              newHeight = availableHeight;
              newWidth = newHeight * imageAspectRatio;
            } else {
              newWidth = availableWidth;
              newHeight = newWidth / imageAspectRatio;
            }
          }

          // Set the canvas width and height to the new scaled size
          canvas.width = newWidth;
          canvas.height = newHeight;

          const asciiEffect = new ASCIIEffect(
            context,
            image,
            newWidth,
            newHeight,
            formData.symbols
          );
          asciiEffect.draw(formData.resolution, image, formData.isColored);
        }
      );
      imagesPreloaded.current = true;
    }
  }, [formData, width, height]);

  const downloadAnimation = () => {
    if (canvasRef.current === null) return;
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png"); // Convert canvas to data URL
    const link = document.createElement("a");
    link.href = image;
    link.download = `${downloadFile.fileName}.${downloadFile.fileFormat}`; // File name for download
    link.click();
  };

  useEffect(() => {
    if (downloadFile.canDownload) {
      downloadAnimation();
      resetFileDownload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadFile]);

  return (
    <div className="h-full flex items-center justify-center bg-template-canvas">
      <canvas
        id="gradient-canvas"
        data-transition-in
        ref={canvasRef}
        width={width - 100}
        height={height - 100}
        className="block bg-white max-md:mb-10"
      />
    </div>
  );
};

export default ASCIICanvas;
