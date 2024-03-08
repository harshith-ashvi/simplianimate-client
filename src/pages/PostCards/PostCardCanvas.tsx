import { utils } from "@/utils";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
    flyerText: string;
  };
}) => {
  // console.log("flyerText", formData.flyerText.split("\n"));
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
      const numShapes = 24;

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
            // char: String.fromCharCode(utils.randomRange(65, 91)),
            char: formData.flyerText,
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
          // context.drawImage(
          //   imagesRef.current[shape.imageSRC],
          //   -100,
          //   -100,
          //   700,
          //   700
          //   // 480,
          //   // 270
          // );

          context.restore();

          if (formData.direction === "forward") {
            shape.z -= 10;
            if (shape.z < 0) {
              shape.z = 10000;
            }
          } else {
            shape.z += 10;
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
