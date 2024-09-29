/* eslint-disable no-inner-declarations */
import { useEffect, useRef, useState } from "react";
import FileSaver from "file-saver";
import * as fabric from "fabric";

import { aspectRatio } from "@/data/canvas";

const TextTestCanvas = ({
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
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: canvasDimension.width,
        height: canvasDimension.height,
        backgroundColor: formData.backgroundColor,
      });

      const text = new fabric.Text(formData.text, {
        left: canvas.width! / 2,
        top: canvas.height! / 2,
        fontSize: formData.fontSize || 100,
        fontFamily: formData.font || "Arial",
        fill: "black",
        originX: "center",
        originY: "center",
      });

      // Create a temporary canvas to render the text
      const tempCanvas = fabric.util.createCanvasElement();
      tempCanvas.width = canvas.width!;
      tempCanvas.height = canvas.height!;
      const tempCtx = tempCanvas.getContext("2d")!;

      // Render the text on the temporary canvas
      text.render(tempCtx);

      const textPixels: { x: number; y: number }[] = [];
      const imageData = tempCtx.getImageData(
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
      );
      const data = imageData.data;

      // Sample points within the text
      const sampleStep = 4;
      for (let x = 0; x < tempCanvas.width; x += sampleStep) {
        for (let y = 0; y < tempCanvas.height; y += sampleStep) {
          const index = (y * tempCanvas.width + x) * 4;
          if (data[index + 3] > 0) {
            // Check alpha channel
            textPixels.push({ x, y });
          }
        }
      }

      const particles: fabric.Circle[] = [];
      const numParticles = textPixels.length;
      const particleRadius = 2;

      // Create particles
      for (let i = 0; i < numParticles; i++) {
        const particle = new fabric.Circle({
          left: Math.random() * canvas.width!,
          top: Math.random() * canvas.height!,
          radius: particleRadius,
          fill: formData.fontColor || "#000000",
          selectable: false,
        });
        particles.push(particle);
        canvas.add(particle);
      }

      function animate() {
        particles.forEach((particle, index) => {
          const targetX = textPixels[index].x;
          const targetY = textPixels[index].y;

          const dx = targetX - particle.left!;
          const dy = targetY - particle.top!;

          particle.set({
            left: particle.left! + dx * 0.1,
            top: particle.top! + dy * 0.1,
          });
        });

        canvas.renderAll();
        fabric.util.requestAnimFrame(animate);
      }

      const canvasJSON = JSON.stringify(canvas.toJSON());
      console.log(canvasJSON);
      // Save this JSON to your Supabase database

      animate();

      return () => {
        canvas.dispose();
      };
    }
  }, [canvasDimension, formData, downloadFile]);

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

export default TextTestCanvas;
