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
            const symbol = this.#symbols[Math.floor(avg / 25)];
            const color = `rgb(${r}, ${g}, ${b})`;
            if (avg > 25)
              this.#imageCellArray.push(new Cell(x, y, symbol, color));
          }
        }
      }
    }
  }
  #drawAscii(isColored: Boolean) {
    if (this.#context) {
      this.#context.clearRect(0, 0, this.#width, this.#height);
      this.#context.fillStyle = "black";
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
  draw(cellSize: number, image: HTMLImageElement, isColored: Boolean) {
    if (cellSize > 1) {
      this.#scanImage(cellSize);
      if (this.#context) {
        this.#context.font = `${cellSize * 1.2}px Verdana`;
      }
      this.#drawAscii(isColored);
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
