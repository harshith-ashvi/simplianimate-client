import { utils } from "@/utils";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import FileSaver from "file-saver";

const aspectRatio: {
  [key: string]: { aspectRatioWidth: number; aspectRatioHeight: number };
} = {
  Portrait: { aspectRatioWidth: 9, aspectRatioHeight: 16 },
  Landscape: { aspectRatioWidth: 16, aspectRatioHeight: 9 },
  Square: { aspectRatioWidth: 1, aspectRatioHeight: 1 },
};

const PostCardCanvas = ({
  width,
  height,
  formData,
  downloadFile,
  resetFileDownload,
}: {
  width: number;
  height: number;
  formData: {
    screenResolution: string;
    backgroundColor: string;
    flyerType: string;
    font: string;
    fontSize: number;
    fontColor: string;
    direction: string;
    speed: number;
    flyersCount: number;
    flyerText: string;
  };
  downloadFile: {
    canDownload: boolean;
    fileName: string;
    fileFormat: string;
  };
  resetFileDownload: () => void;
}) => {
  const [canvasDimension, setCanvasDimesnion] = useState({
    width: (height * 9) / 16,
    height: height,
  });
  const once = useRef(false);
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
    once.current = false;
  }, [width, height, formData.screenResolution]);

  useLayoutEffect(() => {
    if (canvasRef.current !== null) {
      const context = canvasRef.current.getContext("2d");

      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      const fl = 300;
      const shapes = [];
      const numShapes = formData.flyersCount;
      const words = formData.flyerText.split("\n");

      if (!once.current) {
        // once.current = true;
        context.clearRect(0, 0, width, height);
        // context.clearRect(-width / 2, -height / 2, width, height);
        context.fillStyle = formData.backgroundColor;
        context.fillRect(0, 0, width, height);

        for (let i = 0; i < numShapes; i++) {
          shapes.push({
            x: utils.randomRange(-2000, 2000),
            y: utils.randomRange(-2000, 2000),
            z: utils.randomRange(0, 10000),
            char: words[utils.randomInt(0, words.length - 1)],
          });
        }

        flyerAnimation();
      }

      function flyerAnimation() {
        shapes.sort((a, b) => b.z - a.z);
        context.clearRect(0, 0, width, height);

        context.fillStyle = formData.backgroundColor;
        context.fillRect(0, 0, width, height);

        context.save();
        context.translate(width / 2, height / 2);
        let shape = {};
        let perspective = 0;
        for (let i = 0; i < numShapes; i++) {
          shape = shapes[i];
          perspective = fl / (fl + shape.z);

          context.save();
          context.translate(shape.x * perspective, shape.y * perspective);
          context.scale(perspective, perspective);
          context.fillStyle = formData.fontColor;

          context.font = `bold ${formData.fontSize}px ${formData.font}`;
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillText(shape.char, -100, -100);

          context.restore();

          if (formData.direction === "forward") {
            shape.z -= formData.speed;
            if (shape.z < 0) {
              shape.z = 10000;
            }
          } else {
            shape.z += formData.speed;
            if (shape.z > 10000) {
              shape.z = 0;
            }
          }
        }
        context.restore();

        requestAnimationFrame(flyerAnimation);
      }
    }
  }, [formData, canvasDimension]);

  const downloadAnimation = () => {
    if (canvasRef.current === null) return;
    const chunks = []; // here we will store our recorded media chunks (Blobs)
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
    setTimeout(() => rec.stop(), 8000); // stop recording in 3s
  };

  function exportVid(blob) {
    const fileNameAndFormat =
      `${downloadFile.fileName}.${downloadFile.fileFormat}` ??
      `video.${downloadFile.fileFormat}`;
    FileSaver.saveAs(blob, fileNameAndFormat);
  }

  useEffect(() => {
    if (downloadFile.canDownload) {
      downloadAnimation();
      resetFileDownload();
    }
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

export default PostCardCanvas;
