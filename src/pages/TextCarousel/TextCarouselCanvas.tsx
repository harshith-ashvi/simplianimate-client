/* eslint-disable no-inner-declarations */
import { useEffect, useRef, useState } from "react";
import FileSaver from "file-saver";
import * as fabric from "fabric";

import { aspectRatio } from "@/data/canvas";

const TextCarouselCanvas = ({
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
    fallType: string;
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

  useEffect(() => {
    if (canvasRef.current !== null) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: canvasDimension.width,
        height: canvasDimension.height,
        backgroundColor: "white",
      });

      const rect = new fabric.Rect({
        left: 50,
        top: 50,
        backgroundColor: "red",
        width: 100,
        height: 100,
      });

      canvas.add(rect);

      rect.animate(
        { backgroundColor: "yellow" },
        {
          onChange: canvas.renderAll.bind(canvas),
          duration: 5000,
          easing: fabric.util.ease.easeInOutQuad,
          onComplete: () => {
            console.log("Color change complete, starting movement");
            // Animate movement to the right
            rect.animate(
              { left: 250 },
              {
                onChange: canvas.renderAll.bind(canvas),
                duration: 1000,
                easing: fabric.util.ease.easeInOutQuad,
                onComplete: () => {
                  console.log("Movement complete");
                },
              }
            );
            rect.animate(
              { top: 200 },
              {
                onChange: canvas.renderAll.bind(canvas),
                duration: 1500,
                easing: fabric.util.ease.easeInOutQuad,
                onComplete: () => {
                  console.log("Movement complete");
                },
              }
            );
            rect.animate(
              { backgroundColor: "#0000ff" },
              {
                onChange: canvas.renderAll.bind(canvas),
                duration: 1500,
                easing: fabric.util.ease.easeInOutQuad,
                onComplete: () => {
                  console.log("Color Change");
                  rect.animate(
                    { width: 100, height: 300, angle: 45, opacity: 0.5 },
                    {
                      onChange: canvas.renderAll.bind(canvas),
                      duration: 1500,
                      easing: fabric.util.ease.easeInQuad,
                      onComplete: () => {
                        console.log("Movement complete");
                      },
                    }
                  );
                },
              }
            );
          },
        }
      );

      canvas.renderAll();

      // Cleanup on unmount
      return () => {
        canvas.dispose();
      };
    }
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
        // width={canvasDimension.width}
        // height={650}
        className="block max-md:mb-10"
      />
    </div>
  );
};

export default TextCarouselCanvas;
