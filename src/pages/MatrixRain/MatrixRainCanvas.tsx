/* eslint-disable no-inner-declarations */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import FileSaver from "file-saver";

import { hexCodeToRGB } from "@/utils/converters";
import { aspectRatio } from "@/data/canvas";

class EffectSymbol {
  characters: string;
  x: number;
  y: number;
  fontSize: number;
  canvasHeight: number;
  text: string;
  constructor(x: number, y: number, fontSize: number, canvasHeight: number) {
    this.characters =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.canvasHeight = canvasHeight;
    this.text = "";
  }
  draw(context: CanvasRenderingContext2D, customCharacters: string) {
    this.characters = customCharacters.length
      ? customCharacters
      : this.characters;
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  canvasWidth: number;
  canvasHeight: number;
  fontSize: number;
  columns: number;
  symbols: EffectSymbol[];
  constructor(canvasWidth: number, canvasHeight: number, fontSize: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = fontSize;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
  #initialize() {
    this.symbols = [];
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new EffectSymbol(
        i,
        0,
        this.fontSize,
        this.canvasHeight
      );
    }
  }
}

const MatrixRainCanvas = ({
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
    fontSize: number;
    fontColor: string;
    fps: number;
    textType: string;
    unicode: string;
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
  const once = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef(0);

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
    once.current = false;
  }, [width, height, formData.screenResolution]);

  useLayoutEffect(() => {
    if (canvasRef.current !== null) {
      const context = canvasRef.current.getContext("2d");

      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      const matrixRainEffect = new Effect(width, height, formData.fontSize);
      const backgroundColor: string = hexCodeToRGB(
        formData.backgroundColor,
        0.05
      );

      let lastTime = 0;
      const fps = formData.fps;
      const nextFrame = 1000 / fps;
      let timer = 0;

      function matrixRainAnimate(timestamp: number) {
        if (!context) return;
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        if (timer > nextFrame) {
          context.fillStyle = backgroundColor;
          context.fillRect(0, 0, width, height);
          context.textAlign = "center";
          context.fillStyle = formData.fontColor;
          context.font = formData.fontSize + "px monospace";
          matrixRainEffect.symbols.forEach((symbol) =>
            symbol.draw(context, formData.text)
          );
          timer = 0;
        } else {
          timer += deltaTime;
        }
        requestRef.current = requestAnimationFrame(matrixRainAnimate);
      }

      matrixRainAnimate(0);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [formData, canvasDimension]);

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
        style={{ backgroundColor: "black", display: "block" }}
      />
    </div>
  );
};

export default MatrixRainCanvas;
