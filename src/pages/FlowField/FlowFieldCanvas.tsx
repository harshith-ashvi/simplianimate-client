/* eslint-disable no-inner-declarations */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import FileSaver from "file-saver";

import { aspectRatio } from "@/data/canvas";
import krishna from "@/assets/images/krishna.jpg";

interface Point {
  x: number;
  y: number;
}

// class Particle {
//   x: number;
//   y: number;
//   speed: number;
//   color: string;

//   constructor(width: number, height: number) {
//     this.x = Math.random() * width;
//     this.y = Math.random() * height;
//     this.speed = Math.random() * 2 + 1;
//     this.color = "rgba(255, 255, 255, 0.8)"; // Default color, will be updated
//   }

//   update(force: { x: number; y: number }, color: string) {
//     this.x += force.x * this.speed;
//     this.y += force.y * this.speed;
//     this.color = color; // Update color based on image
//   }

//   draw(ctx: CanvasRenderingContext2D) {
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
//     ctx.fillStyle = this.color;
//     ctx.fill();
//   }
// }

// function createFlowField(
//   width: number,
//   height: number,
//   image: HTMLImageElement
// ): { x: number; y: number; color: string }[] {
//   const flowField: { x: number; y: number; color: string }[] = [];
//   const tempCanvas = document.createElement("canvas");
//   const tempCtx = tempCanvas.getContext("2d");
//   if (!tempCtx) return flowField;

//   tempCanvas.width = width;
//   tempCanvas.height = height;

//   // Calculate aspect ratios
//   const canvasRatio = width / height;
//   const imageRatio = image.width / image.height;

//   let drawWidth,
//     drawHeight,
//     offsetX = 0,
//     offsetY = 0;

//   if (canvasRatio > imageRatio) {
//     drawWidth = width;
//     drawHeight = width / imageRatio;
//     offsetY = (height - drawHeight) / 2;
//   } else {
//     drawHeight = height;
//     drawWidth = height * imageRatio;
//     offsetX = (width - drawWidth) / 2;
//   }

//   // Draw the image centered on the canvas
//   tempCtx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
//   const imageData = tempCtx.getImageData(0, 0, width, height);

//   for (let y = 0; y < height; y += 10) {
//     for (let x = 0; x < width; x += 10) {
//       const index = (y * width + x) * 4;
//       const r = imageData.data[index];
//       const g = imageData.data[index + 1];
//       const b = imageData.data[index + 2];
//       const brightness = (r + g + b) / 3;
//       const angle = (brightness / 255) * Math.PI * 2;
//       const force = {
//         x: Math.cos(angle),
//         y: Math.sin(angle),
//       };
//       const color = `rgba(${r}, ${g}, ${b}, 0.8)`;
//       flowField.push({ ...force, color });
//     }
//   }

//   return flowField;
// }

// Simplex noise function (you'll need to implement or import this)
function noise(x: number, y: number, z: number): number {
  // Implement or import a noise function here
  // For simplicity, returning a random number between 0 and 1
  return Math.random();
}

const FlowFieldCanvas = ({
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
    gradientOne: string;
    gradientTwo: string;
    gradientThree: string;
    gradientFour: string;
    imageUrl: string;
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
  const [points, setPoints] = useState<Point[]>([]);
  //   const [image, setImage] = useState<HTMLImageElement | null>(null);

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

  //   useEffect(() => {
  //     const img = new Image();
  //     img.onload = () => setImage(img);
  //     img.src = krishna;
  //   }, []);

  useLayoutEffect(() => {
    if (canvasRef.current !== null) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

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

      const numPoints = 15000;

      const img = new Image();
      img.src = krishna;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        const testCanvas = document.createElement("canvas");
        testCanvas.width = img.width;
        testCanvas.height = img.height;
        const testCtx = testCanvas.getContext("2d");
        if (!testCtx) return;

        testCtx.drawImage(img, 0, 0);

        const initialPoints = Array.from({ length: numPoints }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        }));
        setPoints(initialPoints);

        let animationFrameId: number;

        const render = () => {
          ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const newPoints = points.map((p) => {
            const angle =
              noise(p.x * 0.005, p.y * 0.005, performance.now() * 0.0001) *
              Math.PI *
              2;
            const speed =
              noise(
                p.x * 0.005,
                p.y * 0.005,
                performance.now() * 0.0001 + 1000
              ) * 2;

            let newX = p.x + Math.cos(angle) * speed;
            let newY = p.y + Math.sin(angle) * speed;

            const imgData = testCtx.getImageData(
              Math.floor(p.x),
              Math.floor(p.y),
              1,
              1
            ).data;
            ctx.strokeStyle = `rgb(${imgData[0]}, ${imgData[1]}, ${imgData[2]})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(newX, newY);
            ctx.stroke();

            if (
              newX < 0 ||
              newX > canvas.width ||
              newY < 0 ||
              newY > canvas.height
            ) {
              newX = Math.random() * canvas.width;
              newY = Math.random() * canvas.height;
            }

            return { x: newX, y: newY };
          });

          setPoints(newPoints);
          animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
          cancelAnimationFrame(animationFrameId);
        };
      };

      //   const particles: Particle[] = [];
      //   const numParticles = 10000;

      //   // Create flow field
      //   const flowField = createFlowField(canvas.width, canvas.height, image);

      //   // Initialize particles
      //   for (let i = 0; i < numParticles; i++) {
      //     particles.push(new Particle(canvas.width, canvas.height));
      //   }

      //   function animate() {
      //     if (!ctx) return;
      //     ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      //     ctx.fillRect(0, 0, canvas.width, canvas.height);

      //     for (const particle of particles) {
      //       const col = Math.floor(particle.x / 10);
      //       const row = Math.floor(particle.y / 10);
      //       const index = row * Math.floor(canvas.width / 10) + col;
      //       const flowItem = flowField[index];

      //       if (
      //         flowItem &&
      //         typeof flowItem.x === "number" &&
      //         typeof flowItem.y === "number"
      //       ) {
      //         particle.update({ x: flowItem.x, y: flowItem.y }, flowItem.color);
      //       } else {
      //         particle.update(
      //           { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 },
      //           "rgba(255, 255, 255, 0.8)"
      //         );
      //       }

      //       // Wrap particles around the canvas
      //       particle.x = (particle.x + canvas.width) % canvas.width;
      //       particle.y = (particle.y + canvas.height) % canvas.height;

      //       particle.draw(ctx);
      //     }

      //     requestAnimationFrame(animate);
      //   }

      //   animate();
    }
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
    <div className="h-full flex items-center justify-center bg-template-canvas">
      <canvas
        id="gradient-canvas"
        data-transition-in
        ref={canvasRef}
        width={canvasDimension.width}
        height={canvasDimension.height}
        className="block bg-white max-md:mb-10"
      />
    </div>
  );
};

export default FlowFieldCanvas;
