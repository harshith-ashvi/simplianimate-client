/* eslint-disable no-inner-declarations */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import FileSaver from "file-saver";

import {
  drawOptionsBox,
  drawQuestionBox,
  drawTimerCircle,
  estimateReadingTime,
  getCorrectRowAndColumn,
} from "@/utils/kotyadhipati";

import { aspectRatio } from "@/data/canvas";
import { optionRowTwo, optionsRowOne } from "@/data/templateData";

const templateVariables = {
  Portrait: {
    lineWidth: 5,
    timerPosition: 0.36,
    timerNumberPosition: 0.36,
    questionFont: 15,
    optionsFont: 40,
    timerFont: 38,
    questionWidth: 0.715,
    questionLineSpacing: 42,
  },
  Landscape: {
    lineWidth: 4,
    timerPosition: 0.36,
    timerNumberPosition: 0.35,
    questionFont: 8,
    optionsFont: 30,
    timerFont: 34,
    questionWidth: 1.1,
    questionLineSpacing: 30,
  },
  Square: {
    lineWidth: 3,
    timerPosition: 0.36,
    timerNumberPosition: 0.35,
    questionFont: 8,
    optionsFont: 25,
    timerFont: 30,
    questionWidth: 0.9,
    questionLineSpacing: 28,
  },
};

const KotyadhipatiCanvas = ({
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
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    timerCount: number;
    correctOption: string;
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

  useLayoutEffect(() => {
    if (canvasRef.current !== null) {
      const context = canvasRef.current.getContext("2d");

      const {
        desiredWidth,
        desiredHeight,
      }: { desiredWidth: number; desiredHeight: number } =
        aspectRatio[formData.screenResolution as keyof typeof aspectRatio];

      const resolutionValues =
        templateVariables[
          formData.screenResolution as keyof typeof templateVariables
        ];

      const scaleX = canvasDimension.width / desiredWidth;
      const scaleY = canvasDimension.height / desiredHeight;
      const scale = Math.min(scaleX, scaleY);

      canvasRef.current.width = desiredWidth;
      canvasRef.current.height = desiredHeight;

      canvasRef.current.style.width = `${desiredWidth * scale}px`;
      canvasRef.current.style.height = `${desiredHeight * scale}px`;

      const correctOptionRowColumn = getCorrectRowAndColumn(
        formData.correctOption
      );
      const estimateQuestionReadingTime = estimateReadingTime(
        formData.question
      );

      const startTime = Date.now();
      const endTime =
        startTime + (formData.timerCount + estimateQuestionReadingTime) * 1000;

      function animate() {
        if (!context) return;
        const currentTime = Date.now();
        const remainingTime = Math.max(0, endTime - currentTime);
        const timerCount =
          formData.timerCount >= Math.ceil(remainingTime / 1000)
            ? Math.ceil(remainingTime / 1000)
            : formData.timerCount;

        context.clearRect(0, 0, desiredWidth, desiredHeight);

        context.fillStyle = "#003791";
        context.fillRect(0, 0, desiredWidth, desiredHeight);

        drawQuestionBox(
          context,
          desiredWidth,
          desiredHeight,
          formData.question,
          resolutionValues
        );
        drawOptionsBox(
          context,
          desiredWidth,
          desiredHeight,
          1,
          timerCount === 0,
          correctOptionRowColumn,
          resolutionValues
        );
        drawOptionsBox(
          context,
          desiredWidth,
          desiredHeight,
          2,
          timerCount === 0,
          correctOptionRowColumn,
          resolutionValues
        );

        context.font = `${resolutionValues.optionsFont}px calibre`;
        if (formData.timerCount !== timerCount) {
          const widthHalf = desiredWidth * 0.5;
          context.fillStyle = "gold";
          context.fillText(
            "A. ",
            widthHalf * 0.3,
            desiredHeight * optionsRowOne
          );
          context.textAlign = "start";
          context.fillStyle = "white";
          context.fillText(
            formData.optionA,
            widthHalf * 0.35,
            desiredHeight * optionsRowOne
          );

          context.fillStyle = "gold";
          context.textAlign = "center";
          context.fillText(
            "B. ",
            widthHalf + widthHalf * 0.14,
            desiredHeight * optionsRowOne
          );
          context.textAlign = "start";
          context.fillStyle = "white";
          context.fillText(
            formData.optionB,
            widthHalf + widthHalf * 0.18,
            desiredHeight * optionsRowOne
          );

          context.fillStyle = "gold";
          context.textAlign = "center";
          context.fillText(
            "C. ",
            widthHalf * 0.3,
            desiredHeight * optionRowTwo
          );
          context.textAlign = "start";
          context.fillStyle = "white";
          context.fillText(
            formData.optionC,
            widthHalf * 0.35,
            desiredHeight * optionRowTwo
          );

          context.fillStyle = "gold";
          context.textAlign = "center";
          context.fillText(
            "D. ",
            widthHalf + widthHalf * 0.14,
            desiredHeight * optionRowTwo
          );
          context.textAlign = "start";
          context.fillStyle = "white";
          context.fillText(
            formData.optionD,
            widthHalf + widthHalf * 0.18,
            desiredHeight * optionRowTwo
          );
        }

        drawTimerCircle(
          context,
          desiredWidth,
          desiredHeight,
          timerCount,
          resolutionValues
        );
        requestIdRef.current = requestAnimationFrame(animate);
      }
      animate();
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
    const estimateQuestionReadingTime = estimateReadingTime(formData.question);
    setTimeout(
      () => rec.stop(),
      (downloadDuration + estimateQuestionReadingTime + 2) * 1000
    ); // stop recording in 3s
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

export default KotyadhipatiCanvas;
