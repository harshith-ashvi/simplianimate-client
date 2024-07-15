/* eslint-disable no-inner-declarations */
// import { utils } from "@/utils";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import FileSaver from "file-saver";

import { aspectRatio } from "@/data/canvas";

const xPositionForSlider = {
  Portrait: 100,
  Landscape: 140,
  Square: 100,
};

const endWidthHeightFactor = {
  Portrait: { widthFactor: 0.035, heightFactor: 0.2 },
  Landscape: { widthFactor: 0.02, heightFactor: 0.32 },
  Square: { widthFactor: 0.03, heightFactor: 0.25 },
};

const TextRevealCanvas = ({
  width,
  height,
  downloadDuration,
  formData,
  downloadFile,
  resetFileDownload,
  toggleDownloading,
}: {
  width: number;
  height: number;
  downloadDuration: number;
  formData: {
    screenResolution: string;
    backgroundColor: string;
    font: string;
    fontSize: number;
    fontColor: string;
    stickColor: string;
    text: string;
  };
  downloadFile: {
    canDownload: boolean;
    fileName: string;
    fileFormat: string;
  };
  resetFileDownload: () => void;
  toggleDownloading: () => void;
}) => {
  const [canvasDimension, setCanvasDimesnion] = useState({
    width: (height * 9) / 16,
    height: height,
  });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const newHeight = height - 100;
    const newWidth = width - 100;
    let canvasWidth, canvasHeight;

    const {
      aspectRatioWidth,
      aspectRatioHeight,
    }: { aspectRatioWidth: number; aspectRatioHeight: number } =
      aspectRatio[formData.screenResolution as keyof typeof aspectRatio];

    // Calculate canvas dimensions to fit in the div with 9x16 aspect ratio
    canvasHeight = newHeight;
    canvasWidth = newHeight * (aspectRatioWidth / aspectRatioHeight);

    // Check if calculated width exceeds the div's width
    if (canvasWidth > newWidth) {
      // Adjust based on width being the limiting factor
      canvasWidth = newWidth;
      canvasHeight = newWidth * (aspectRatioHeight / aspectRatioWidth);
    }

    setCanvasDimesnion({ width: canvasWidth, height: canvasHeight });
  }, [width, height, formData.screenResolution]);

  // Easing function for a smoother animation
  function easeInOutQuad(t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  useLayoutEffect(() => {
    if (canvasRef.current !== null) {
      const context = canvasRef.current.getContext("2d");
      if (!context) return;

      const {
        desiredWidth,
        desiredHeight,
      }: { desiredWidth: number; desiredHeight: number } =
        aspectRatio[formData.screenResolution as keyof typeof aspectRatio];

      const scaleX = canvasDimension.width / desiredWidth;
      const scaleY = canvasDimension.height / desiredHeight;
      const scale = Math.min(scaleX, scaleY);

      canvasRef.current.width = desiredWidth;
      canvasRef.current.height = desiredHeight;

      canvasRef.current.style.width = `${desiredWidth * scale}px`;
      canvasRef.current.style.height = `${desiredHeight * scale}px`;

      const sliderXPosition =
        xPositionForSlider[
          formData.screenResolution as keyof typeof xPositionForSlider
        ];
      let animationType = "expand";
      const words = formData.text.split("\n");
      let wordIndex = 0;

      const { widthFactor, heightFactor } =
        endWidthHeightFactor[
          formData.screenResolution as keyof typeof endWidthHeightFactor
        ];

      let startTime: number | null = null;
      const duration = 1000; // 1 seconds in milliseconds
      const startWidth = 10;
      const endWidth = desiredWidth * widthFactor;
      const startHeight = 0;
      const endHeight = desiredHeight * heightFactor;

      let sliderMoveTime: number | null = null;
      const sliderMoveDuration = 1500; // 1.5 seconds in milliseconds
      const sliderStartingXPosition = -desiredWidth / 2 + sliderXPosition;
      const sliderEndingXPosition = desiredWidth / 2 - sliderXPosition;

      // Function to draw a rotated rectangle with smooth edges
      function drawRotatedRect(
        x: number,
        y: number,
        width: number,
        height: number,
        angle: number,
        isMask?: boolean
      ) {
        if (!context) return;
        context.save(); // Save the current state
        context.translate(x, y); // Move to the rectangle center
        context.rotate(angle); // Rotate
        context.translate(-x, -y); // Move back
        context.beginPath();
        context.rect(isMask ? x : x - width / 2, y - height / 2, width, height); // Draw the rectangle
        if (isMask) {
          context.fillStyle = formData.backgroundColor;
        } else {
          context.fillStyle = formData.stickColor;
        }
        context.fill();
        context.restore(); // Restore the state
      }

      function animate(timestamp: number) {
        if (!context) return;
        if (animationType === "expand") {
          if (!startTime) startTime = timestamp;
          const elapsedTime = timestamp - startTime;
          const sliderWidth = easeInOutQuad(
            elapsedTime,
            startWidth,
            endWidth - startWidth,
            duration
          );
          const sliderHeight = easeInOutQuad(
            elapsedTime,
            startHeight,
            endHeight - startHeight,
            duration
          );

          context.clearRect(0, 0, desiredWidth, desiredHeight); // Clear the canvas
          context.fillStyle = formData.backgroundColor;
          context.fillRect(0, 0, desiredWidth, desiredHeight);
          context.save();
          context.translate(desiredWidth / 2, desiredHeight / 2);
          // Draw a rectangle
          drawRotatedRect(
            -desiredWidth / 2 + sliderXPosition,
            0,
            sliderWidth,
            sliderHeight,
            (10 * Math.PI) / 180
          );
          drawRotatedRect(
            -desiredWidth / 2 + sliderXPosition + 5,
            0,
            desiredWidth,
            desiredHeight * 2,
            (10 * Math.PI) / 180,
            true
          );
          context.restore();

          if (elapsedTime < duration) {
            // Continue the animation loop
            requestIdRef.current = requestAnimationFrame(animate);
          } else {
            startTime = null;
            animationType = "moveForward";
            requestIdRef.current = requestAnimationFrame(animate);
          }
        } else if (animationType === "moveForward") {
          if (!sliderMoveTime) sliderMoveTime = timestamp;
          const elapsedTime = timestamp - sliderMoveTime;
          const sliderXPosition = easeInOutQuad(
            elapsedTime,
            sliderStartingXPosition,
            sliderEndingXPosition - sliderStartingXPosition,
            sliderMoveDuration
          );

          context.clearRect(0, 0, desiredWidth, desiredHeight); // Clear the canvas
          context.fillStyle = formData.backgroundColor;
          context.fillRect(0, 0, desiredWidth, desiredHeight);
          context.save();
          context.translate(desiredWidth / 2, desiredHeight / 2);

          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillStyle = formData.fontColor;
          context.font = `${formData.fontSize}px ${formData.font}`;
          context.fillText(words[wordIndex], 0, 0);

          // Draw a rectangle
          drawRotatedRect(
            sliderXPosition,
            0,
            endWidth,
            endHeight,
            (10 * Math.PI) / 180
          );
          drawRotatedRect(
            sliderXPosition + 5,
            0,
            desiredWidth,
            desiredHeight * 2,
            (10 * Math.PI) / 180,
            true
          );
          context.restore();

          if (elapsedTime < sliderMoveDuration) {
            requestIdRef.current = requestAnimationFrame(animate);
          } else {
            sliderMoveTime = null;
            animationType = "moveBackward";
            requestIdRef.current = requestAnimationFrame(animate);
          }
        } else if (animationType === "moveBackward") {
          if (!sliderMoveTime) sliderMoveTime = timestamp;
          const elapsedTime = timestamp - sliderMoveTime;
          const sliderXPosition = easeInOutQuad(
            elapsedTime,
            sliderEndingXPosition,
            sliderStartingXPosition - sliderEndingXPosition,
            sliderMoveDuration
          );

          context.clearRect(0, 0, desiredWidth, desiredHeight); // Clear the canvas
          context.fillStyle = formData.backgroundColor;
          context.fillRect(0, 0, desiredWidth, desiredHeight);
          context.save();
          context.translate(desiredWidth / 2, desiredHeight / 2);

          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillStyle = formData.fontColor;
          context.font = `${formData.fontSize}px ${formData.font}`;
          context.fillText(words[wordIndex], 0, 0);

          // Draw a rectangle
          drawRotatedRect(
            sliderXPosition,
            0,
            endWidth,
            endHeight,
            (10 * Math.PI) / 180
          );
          drawRotatedRect(
            sliderXPosition + 5,
            0,
            desiredWidth,
            desiredHeight * 2,
            (10 * Math.PI) / 180,
            true
          );
          context.restore();

          if (elapsedTime < sliderMoveDuration) {
            requestIdRef.current = requestAnimationFrame(animate);
          } else if (wordIndex < words.length - 1) {
            ++wordIndex;
            sliderMoveTime = null;
            animationType = "moveForward";
            requestIdRef.current = requestAnimationFrame(animate);
          }
        }
      }

      animate(0);
    }
    return () => cancelAnimationFrame(requestIdRef.current);
  }, [formData, canvasDimension, downloadFile.canDownload]);

  const downloadAnimation = () => {
    if (canvasRef.current === null) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chunks: any = []; // here we will store our recorded media chunks (Blobs)
    const stream = canvasRef.current.captureStream(60); // grab our canvas MediaStream
    const options = { mimeType: `video/webm` };
    const rec = new MediaRecorder(stream, options); // init the recorder
    // every time the recorder has new data, we will store it in our array
    rec.ondataavailable = (e) => chunks.push(e.data);
    // only when the recorder stops, we construct a complete Blob from all the chunks
    // rec.onstop = () => exportVid(new Blob(chunks, { type: "video/webm" }));
    rec.onstop = () =>
      exportVid(new Blob(chunks, { type: `video/${downloadFile.fileFormat}` }));
    // rec.onstop = () => exportVid(new Blob(chunks, { type: "video/mp4" }));

    rec.start();
    setTimeout(() => rec.stop(), downloadDuration * 1000); // stop recording in 3s
  };

  function exportVid(blob: Blob) {
    const fileNameAndFormat =
      `${downloadFile.fileName}.${downloadFile.fileFormat}` ??
      `video.${downloadFile.fileFormat}`;
    FileSaver.saveAs(blob, fileNameAndFormat);
    toggleDownloading();
  }

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
        ref={canvasRef}
        width={canvasDimension.width}
        height={canvasDimension.height}
        className="block bg-white max-md:mb-10"
      />
    </div>
  );
};

export default TextRevealCanvas;
