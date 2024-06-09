export const drawQuestionBox = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  question: string
) => {
  const questionHeight = height * 0.65;
  const boxHeight = height * 0.04;
  context.beginPath();
  context.moveTo(0, questionHeight);
  context.lineTo(width * 0.1, questionHeight);
  context.lineTo(width * 0.15, questionHeight - boxHeight);
  context.lineTo(width * 0.85, questionHeight - boxHeight);
  context.lineTo(width * 0.9, questionHeight);
  context.lineTo(width, questionHeight);
  context.lineTo(width * 0.9, questionHeight);
  context.lineTo(width * 0.85, questionHeight + boxHeight);
  context.lineTo(width * 0.15, questionHeight + boxHeight);
  context.lineTo(width * 0.1, questionHeight);
  context.closePath();
  context.fillStyle = "#00358e";
  context.fill();
  context.strokeStyle = "gold";
  context.lineWidth = 2.5;
  context.stroke();

  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "white";
  context.font = `${boxHeight - 10}px calibre`;
  context.fillText(question, width / 2, height * 0.65);
};

export const drawOptionsBox = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  optionsRow: number = 1,
  canShowAnswer: boolean = false,
  correctOptionRowColumn: { row: number; column: number }
) => {
  const widthHalf = width * 0.5;
  const questionHeight = height * (optionsRow === 1 ? 0.74 : 0.81);
  const boxHeight = height * 0.03;
  context.beginPath();
  context.moveTo(0, questionHeight);
  context.lineTo(width * 0.1, questionHeight);
  context.lineTo(widthHalf * 0.25, questionHeight - boxHeight);
  context.lineTo(widthHalf * 0.9, questionHeight - boxHeight);
  context.lineTo(widthHalf * 0.95, questionHeight - boxHeight);
  context.lineTo(widthHalf, questionHeight);
  context.lineTo(widthHalf * 0.95, questionHeight + boxHeight);
  context.lineTo(widthHalf * 0.9, questionHeight + boxHeight);
  context.lineTo(widthHalf * 0.25, questionHeight + boxHeight);
  context.lineTo(width * 0.1, questionHeight);
  context.closePath();
  context.fillStyle = "#00358e";
  if (
    canShowAnswer &&
    optionsRow === correctOptionRowColumn.row &&
    correctOptionRowColumn.column === 1
  ) {
    context.fillStyle = "green";
  }
  context.fill();

  context.strokeStyle = "gold";
  context.lineWidth = 2;
  context.stroke();

  context.beginPath();
  context.moveTo(widthHalf, questionHeight);
  context.lineTo(widthHalf + widthHalf * 0.02, questionHeight);
  context.lineTo(widthHalf + widthHalf * 0.08, questionHeight - boxHeight);
  context.lineTo(widthHalf + widthHalf * 0.72, questionHeight - boxHeight);
  context.lineTo(widthHalf + widthHalf * 0.78, questionHeight);
  context.lineTo(width, questionHeight);
  context.lineTo(widthHalf + widthHalf * 0.78, questionHeight);
  context.lineTo(widthHalf + widthHalf * 0.72, questionHeight + boxHeight);
  context.lineTo(widthHalf + widthHalf * 0.08, questionHeight + boxHeight);
  context.lineTo(widthHalf + widthHalf * 0.02, questionHeight);
  context.closePath();
  context.fillStyle = "#00358e";
  if (
    canShowAnswer &&
    optionsRow === correctOptionRowColumn.row &&
    correctOptionRowColumn.column === 2
  ) {
    context.fillStyle = "green";
  }
  context.fill();
  context.strokeStyle = "gold";
  context.lineWidth = 2;
  context.stroke();
};

export const drawOption = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  optionsRow: number = 1,
  optionOne: string,
  optionTwo: string
) => {
  const widthHalf = width * 0.5;
  const questionHeight = height * (optionsRow === 1 ? 0.74 : 0.81);
  const boxHeight = height * 0.03;

  if (Boolean(optionOne)) {
    // context.globalCompositeOperation = "destination-out";
    console.log("optionOne", optionOne);
    context.font = `${boxHeight - 8}px calibre`;
    context.fillStyle = "gold";
    context.fillText(
      `${optionsRow === 1 ? "A" : "C"}. `,
      widthHalf * 0.3,
      height * questionHeight
    );
    console.log("hello");
    context.rect(50, 50, 100, 100);
    context.textAlign = "start";
    context.fillStyle = "white";
    context.fillText(optionOne, widthHalf * 0.35, height * questionHeight);
  }

  if (Boolean(optionTwo)) {
    context.fillStyle = "gold";
    context.textAlign = "center";
    // context.globalCompositeOperation = "source-over";
    context.fillText(
      `${optionsRow === 1 ? "B" : "D"}. `,
      widthHalf + widthHalf * 0.14,
      height * questionHeight
    );
    context.textAlign = "start";
    context.fillStyle = "white";
    context.fillText(
      optionTwo,
      widthHalf + widthHalf * 0.18,
      height * questionHeight
    );
  }
};

export const setResponsiveFont = (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxHeight: number,
  initialFontSize: number,
  fontFamily: string
) => {
  let fontSize = initialFontSize;
  context.font = `${fontSize}px ${fontFamily}`;
  let textMetrics = context.measureText(text);

  // Reduce the font size until the text fits the width and the height
  while (
    (textMetrics.width > maxWidth ||
      textMetrics.actualBoundingBoxAscent +
        textMetrics.actualBoundingBoxDescent >
        maxHeight) &&
    fontSize > 5
  ) {
    fontSize--;
    context.font = `${fontSize}px ${fontFamily}`;
    textMetrics = context.measureText(text);
  }

  return fontSize;
};

export const drawTimerCircle = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  timerCount: number
) => {
  const centerX = width / 2;
  const centerY = height * 0.6 + height * 0.01;
  context.beginPath();
  context.arc(centerX, centerY, 25, Math.PI, 0, false);
  context.lineWidth = 3;
  context.strokeStyle = "gold";
  context.stroke();
  context.closePath();

  context.fillStyle = "gold";
  context.textAlign = "center";
  context.fillText(`${timerCount}`, centerX, height * 0.6);
};

export const getCorrectRowAndColumn = (option: string) => {
  switch (option) {
    case "A":
      return { row: 1, column: 1 };
    case "B":
      return { row: 1, column: 2 };
    case "C":
      return { row: 2, column: 1 };
    case "D":
      return { row: 2, column: 2 };
    default:
      return { row: 0, column: 0 };
  }
};

export const estimateReadingTime = (text: string) => {
  const wordsPerMinute = 200; // Average reading speed
  const words = text.trim().split(/\s+/).length; // Count words by splitting the text by whitespace
  const minutes = words / wordsPerMinute;
  const seconds = Math.ceil(minutes * 60); // Convert minutes to seconds and round up

  return seconds;
};
