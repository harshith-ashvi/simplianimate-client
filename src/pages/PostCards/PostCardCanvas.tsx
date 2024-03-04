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
    animationType: string;
  };
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

      if (!once.current) {
        context.fillStyle = formData.backgroundColor;
        context.fillRect(0, 0, width, height);
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
