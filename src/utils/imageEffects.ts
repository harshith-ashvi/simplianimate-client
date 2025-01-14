// acsii effect cell
class Cell {
  x: number; // Declare properties
  y: number;
  symbol: string;
  color: string;

  constructor(x: number, y: number, symbol: string, color: string) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.color = color;
  }
  draw(context: CanvasRenderingContext2D, isColored: Boolean) {
    context.fillText(this.symbol, this.x + 0.5, this.y + 0.5);

    context.fillStyle = isColored ? this.color : "white";

    context.fillText(this.symbol, this.x, this.y);
  }
}

// acsii effect
export class ASCIIEffect {
  #imageCellArray: Cell[] = [];
  #symbols: string = "Ñ@#W$9876543210?!abc;:+=-,._ ";
  #pixels: ImageData | null = null;
  #context: CanvasRenderingContext2D | null = null;
  #width: number = 0;
  #height: number = 0;
  constructor(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    width: number,
    height: number,
    symbols: string
  ) {
    this.#context = context;
    this.#width = width;
    this.#height = height;
    this.#symbols = symbols;
    this.#context.drawImage(image, 0, 0, this.#width, this.#height);
    this.#pixels = this.#context.getImageData(0, 0, this.#width, this.#height);
  }
  #getCharacters(colorValue: number) {
    const intervalSize = 255 / this.#symbols.length;
    const index = Math.floor(colorValue / intervalSize);
    return this.#symbols[Math.min(index, this.#symbols.length - 1)] ?? 0;
  }
  #scanImage(cellSize: number) {
    this.#imageCellArray = [];
    if (this.#pixels) {
      for (let y = 0; y < this.#pixels.height; y += cellSize) {
        for (let x = 0; x < this.#pixels.width; x += cellSize) {
          const index = (y * this.#pixels.width + x) * 4;
          if (this.#pixels.data[index + 3] > 128) {
            const r = this.#pixels.data[index];
            const g = this.#pixels.data[index + 1];
            const b = this.#pixels.data[index + 2];
            const avg = (r + g + b) / 3;
            // const symbol = this.#symbols[Math.floor(avg / 25)];
            const symbol = this.#getCharacters(avg);
            const color = `rgb(${r}, ${g}, ${b})`;
            if (avg > 25)
              this.#imageCellArray.push(new Cell(x, y, symbol, color));
          }
        }
      }
    }
  }
  #drawAscii(isColored: Boolean, backgroundColor: string) {
    if (this.#context) {
      this.#context.clearRect(0, 0, this.#width, this.#height);
      this.#context.fillStyle = backgroundColor ?? "black";
      this.#context.fillRect(0, 0, this.#width, this.#height);
      for (let i = 0; i < this.#imageCellArray.length; i++) {
        this.#imageCellArray[i].draw(this.#context, isColored);
      }
    }
  }
  #drawImage(image: HTMLImageElement) {
    if (this.#context) {
      this.#context.clearRect(0, 0, this.#width, this.#height);
      this.#context.drawImage(image, 0, 0, this.#width, this.#height);
    }
  }
  draw(
    cellSize: number,
    image: HTMLImageElement,
    isColored: Boolean,
    backgroundColor: string
  ) {
    if (cellSize > 1) {
      this.#scanImage(cellSize);
      if (this.#context) {
        this.#context.font = `${cellSize * 1.2}px Verdana`;
      }
      this.#drawAscii(isColored, backgroundColor);
    } else {
      this.#drawImage(image);
    }
  }
}

class PixelCell {
  x: number;
  y: number;
  cellSize: number;
  radius: number;
  color: string;
  constructor(x: number, y: number, cellSize: number, color: string) {
    this.x = x;
    this.y = y;
    this.cellSize = cellSize;
    this.radius = cellSize / 2;
    this.color = color;
  }
  draw(context: CanvasRenderingContext2D, shape: string) {
    context.fillStyle = this.color;
    switch (shape) {
      case "Semi-Circle":
      case "Circle":
        context.beginPath();
        context.arc(
          this.x + this.radius,
          this.y + this.radius,
          this.radius,
          0,
          shape === "Semi-Circle" ? Math.PI : 2 * Math.PI
        );
        context.fillStyle = this.color;
        context.fill();
        break;
      default:
        context.fillRect(this.x, this.y, this.cellSize, this.cellSize);
        break;
    }
  }
}

// pixel effect
export class PixelEffect {
  #imageCellArray: PixelCell[] = [];
  #context: CanvasRenderingContext2D | null = null;
  #width: number = 0;
  #height: number = 0;
  #pixels: ImageData | null = null;
  constructor(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    width: number,
    height: number
  ) {
    this.#context = context;
    this.#width = width;
    this.#height = height;
    this.#context.drawImage(image, 0, 0, this.#width, this.#height);
    this.#pixels = this.#context.getImageData(0, 0, this.#width, this.#height);
  }

  #scanImage(cellSize: number) {
    this.#imageCellArray = [];
    if (this.#pixels) {
      for (let y = 0; y < this.#pixels.height; y += cellSize) {
        for (let x = 0; x < this.#pixels.width; x += cellSize) {
          const index = (y * this.#pixels.width + x) * 4;
          const r = this.#pixels.data[index];
          const g = this.#pixels.data[index + 1];
          const b = this.#pixels.data[index + 2];
          const color = `rgb(${r}, ${g}, ${b})`;
          this.#imageCellArray.push(new PixelCell(x, y, cellSize, color));
        }
      }
    }
  }

  #drawPixel(shape: string) {
    if (this.#context) {
      this.#context.clearRect(0, 0, this.#width, this.#height);
      this.#context.fillStyle = "black";
      this.#context.fillRect(0, 0, this.#width, this.#height);
      for (let i = 0; i < this.#imageCellArray.length; i++) {
        this.#imageCellArray[i].draw(this.#context, shape);
      }
    }
  }

  #drawImage(image: HTMLImageElement) {
    if (this.#context) {
      this.#context.clearRect(0, 0, this.#width, this.#height);
      this.#context.drawImage(image, 0, 0, this.#width, this.#height);
    }
  }

  draw(image: HTMLImageElement, cellSize: number, shape: string) {
    if (cellSize > 1) {
      this.#scanImage(cellSize);
      this.#drawPixel(shape);
    } else {
      this.#drawImage(image);
    }
  }
}

export class DisplacementMapEffect {
  #context: CanvasRenderingContext2D | null = null;
  #width: number = 0;
  #height: number = 0;
  #pixels: ImageData | null = null;
  constructor(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    width: number,
    height: number
  ) {
    this.#context = context;
    this.#width = width;
    this.#height = height;
    this.#context.drawImage(image, 0, 0, this.#width, this.#height);
    this.#pixels = this.#context.getImageData(0, 0, this.#width, this.#height);
  }
  #createDisplacementMap() {
    const map = new Uint8ClampedArray(this.#width * this.#height * 4); // RGBA array
    for (let i = 0; i < map.length; i += 4) {
      map[i] = Math.random() * 255; // Red (used for x displacement)
      map[i + 1] = Math.random() * 255; // Green (used for y displacement)
      map[i + 2] = 0; // Blue (not used)
      map[i + 3] = 255; // Alpha (fully opaque)
    }
    return map;
  }
  #displacePixels(
    displacementMap: Uint8ClampedArray,
    strength: number,
    hFactor: number,
    vFactor: number
  ) {
    if (!this.#pixels) return;
    const data = this.#pixels.data;
    const width = this.#pixels.width;
    const height = this.#pixels.height;
    const newImageData = new Uint8ClampedArray(data); // Clone pixel data

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const dispX = (displacementMap[index] / 255 - 0.5) * strength * hFactor; // Horizontal displacement
        const dispY =
          (displacementMap[index + 1] / 255 - 0.5) * strength * vFactor; // Vertical displacement

        const srcX = Math.min(Math.max(x + dispX, 0), width - 1);
        const srcY = Math.min(Math.max(y + dispY, 0), height - 1);
        const srcIndex = (Math.floor(srcY) * width + Math.floor(srcX)) * 4;

        newImageData[index] = data[srcIndex];
        newImageData[index + 1] = data[srcIndex + 1];
        newImageData[index + 2] = data[srcIndex + 2];
        newImageData[index + 3] = data[srcIndex + 3];
      }
    }

    return new ImageData(newImageData, width, height);
  }
  draw(
    // displacementEffectType: string,
    strength: number,
    hFactor: number,
    vFactor: number
  ) {
    if (!this.#context) return;
    const displacementMap = this.#createDisplacementMap(); // Custom function to create displacement map

    const displacedImageData = this.#displacePixels(
      displacementMap,
      strength,
      hFactor,
      vFactor
    );

    if (!displacedImageData) return;
    this.#context.clearRect(0, 0, this.#width, this.#height);
    this.#context.putImageData(displacedImageData, 0, 0);
  }
}

export class ComicEffect {
  #context: CanvasRenderingContext2D | null = null;
  #width: number = 0;
  #height: number = 0;
  #pixels: ImageData | null = null;
  constructor(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    width: number,
    height: number
  ) {
    this.#context = context;
    this.#width = width;
    this.#height = height;
    this.#context.drawImage(image, 0, 0, this.#width, this.#height);
    this.#pixels = this.#context.getImageData(0, 0, this.#width, this.#height);
  }
  #applyHalftoneDots() {
    const dotSize = 5;
    console.log(dotSize);

    if (this.#pixels && this.#context) {
      const data = this.#pixels.data;
      for (let y = 0; y < this.#pixels.height; y += dotSize) {
        for (let x = 0; x < this.#pixels.width; x += dotSize) {
          const index = (y * this.#width + x) * 4;
          const avg = (data[index] + data[index + 1] + data[index + 2]) / 3; // Grayscale average
          const radius = (dotSize / 255) * avg;

          this.#context.fillStyle = `rgb(${data[index]}, ${data[index + 1]}, ${
            data[index + 2]
          })`;
          this.#context.beginPath();
          this.#context.arc(
            x + dotSize / 2,
            y + dotSize / 2,
            radius / 2,
            0,
            Math.PI * 2
          );
          this.#context.fill();
        }
      }
    }
  }

  #applyBoldOutlines() {
    const outlineThreshold = 80; // Edge detection threshold
    if (this.#pixels && this.#context) {
      const data = this.#pixels.data;
      // Create an empty array for the edge detection result
      const edgeData = new Uint8ClampedArray(data.length);
      for (let y = 1; y < this.#pixels.height - 1; y++) {
        for (let x = 1; x < this.#pixels.width - 1; x++) {
          const index = (y * this.#pixels.width + x) * 4;

          // Calculate differences in brightness
          const brightness =
            (data[index] + data[index + 1] + data[index + 2]) / 3;
          const brightnessRight =
            (data[index + 4] + data[index + 5] + data[index + 6]) / 3;
          const brightnessDown =
            (data[index + this.#pixels.width * 4] +
              data[index + this.#pixels.width * 4 + 1] +
              data[index + this.#pixels.width * 4 + 2]) /
            3;

          if (
            Math.abs(brightness - brightnessRight) > outlineThreshold ||
            Math.abs(brightness - brightnessDown) > outlineThreshold
          ) {
            edgeData[index] = 0; // Black outline
            edgeData[index + 1] = 0;
            edgeData[index + 2] = 0;
            edgeData[index + 3] = 255;
          } else {
            edgeData[index] = data[index];
            edgeData[index + 1] = data[index + 1];
            edgeData[index + 2] = data[index + 2];
            edgeData[index + 3] = data[index + 3];
          }
        }
      }

      this.#context.putImageData(
        new ImageData(edgeData, this.#pixels.width, this.#pixels.height),
        0,
        0
      );
    }
  }

  #applyColorEnhancement() {
    if (this.#pixels && this.#context) {
      const data = this.#pixels.data;
      for (let i = 0; i < data.length; i += 4) {
        // Increase saturation by amplifying differences from the average
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] += (data[i] - avg) * 0.5; // Red
        data[i + 1] += (data[i + 1] - avg) * 0.5; // Green
        data[i + 2] += (data[i + 2] - avg) * 0.5; // Blue
      }

      this.#context.putImageData(this.#pixels, 0, 0);
    }
  }

  #drawImage(image: HTMLImageElement) {
    if (this.#context) {
      this.#context.clearRect(0, 0, this.#width, this.#height);
      this.#context.drawImage(image, 0, 0, this.#width, this.#height);
    }
  }
  draw(image: HTMLImageElement) {
    this.#drawImage(image);
    // if (cellSize > 1) {
    //   this.#scanImage(cellSize);
    //   this.#drawPixel(shape);
    // } else {
    //   this.#drawImage(image);
    // }

    // Apply halftone dots
    this.#applyHalftoneDots();

    // Apply bold outlines
    this.#applyBoldOutlines();

    // Enhance colors
    this.#applyColorEnhancement();
  }
}
