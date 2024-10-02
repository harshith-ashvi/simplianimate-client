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
