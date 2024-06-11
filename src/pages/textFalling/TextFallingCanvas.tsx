/* eslint-disable no-inner-declarations */
// import { utils } from "@/utils";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import FileSaver from "file-saver";

import { aspectRatio } from "@/data/canvas";

const TextFallingCanvas = ({
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
    text: string;
    fallDelay: number;
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
  // const requestIdRef = useRef(0);
  const [startAnimation, setStartAnimation] = useState(false);

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

  useLayoutEffect(() => {
    if (canvasRef.current !== null) {
      const context = canvasRef.current.getContext("2d");
      if (!context) return;

      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      const bottomLine = height - 100; // The line 10px from the bottom
      context.font = `${formData.fontSize}px ${formData.font}`;
      const textMetrics = context.measureText(formData.text);
      const totalTextWidth = textMetrics.width;
      const startX = (width - totalTextWidth) / 2;

      // Initial character positions
      let charPositions = Array.from(formData.text).map((char, index) => {
        return {
          char,
          x: startX + context.measureText(formData.text.slice(0, index)).width,
          y: height / 2,
          vy: 0, // Initial velocity
          delay: Math.random() * 1000, // Random delay before starting to fall
          isFalling: false,
        };
      });

      const drawText = () => {
        context.clearRect(0, 0, width, height);

        context.fillStyle = formData.backgroundColor;
        context.fillRect(0, 0, width, height);

        charPositions.forEach((charPos) => {
          context.font = `${formData.fontSize}px ${formData.font}`;
          context.fillStyle = formData.fontColor;
          context.fillText(charPos.char, charPos.x, charPos.y);
        });
      };

      drawText();

      const animateText = () => {
        if (!startAnimation) return;

        charPositions = charPositions.map((charPos) => {
          if (!charPos.isFalling) {
            if (charPos.delay <= 0) {
              charPos.isFalling = true;
            } else {
              charPos.delay -= 16.67; // Approximate frame duration in milliseconds
            }
          }

          if (charPos.isFalling) {
            charPos.vy += 0.5; // Gravity acceleration
            charPos.y += charPos.vy;

            if (charPos.y > bottomLine) {
              charPos.y = bottomLine;
              charPos.vy = 0;
            }
          }

          return charPos;
        });

        drawText();
        requestAnimationFrame(animateText);
      };

      drawText();

      const timer = setTimeout(() => {
        setStartAnimation(true);
        animateText();
      }, formData.fallDelay * 1000); // Delay of 2 seconds before starting the animation

      return () => clearTimeout(timer);
    }
  }, [formData, canvasDimension, downloadFile.canDownload, startAnimation]);

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
    <div
      style={{
        backgroundColor: "#D9D9D9",
      }}
      className="h-full flex items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        width={canvasDimension.width}
        height={canvasDimension.height}
        style={{ backgroundColor: "white", display: "block" }}
      />
    </div>
  );
};

export default TextFallingCanvas;
