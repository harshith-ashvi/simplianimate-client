import { optionRowTwo, optionsRowOne } from "@/data/templateData";

type TemplateVariablesProps = {
  lineWidth: number;
  timerPosition: number;
  timerNumberPosition: number;
  questionFont: number;
  optionsFont: number;
  timerFont: number;
  questionWidth: number;
  questionLineSpacing: number;
};

const getTextForQuestion = (
  context: CanvasRenderingContext2D,
  questionText: string,
  maxWidth: number
) => {
  const words = questionText.split(" "); // Split the text into words
  let lines: string[] = []; // Array to hold lines of text
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine + " " + word; // Test this line with the new word
    const metrics = context.measureText(testLine); // Measure the text width of this potential line
    if (metrics.width < maxWidth) {
      // If it fits, continue to add to the current line
      currentLine = testLine;
    } else {
      // If it doesn't fit, push the current line to the lines array and start a new line with the current word
      lines.push(currentLine);
      currentLine = word;
    }
  }
  // Push the last line into the lines array if it has any words left
  lines.push(currentLine);

  return lines;
};

export const drawQuestionBox = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  question: string,
  resolutionValues: TemplateVariablesProps
) => {
  const questionHeight = height * 0.4;
  const boxHeight = height * 0.03;
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
  context.lineWidth = resolutionValues.lineWidth;
  context.stroke();

  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "white";
  // 0.715
  const lines = getTextForQuestion(
    context,
    question,
    width * resolutionValues.questionWidth
  );
  context.font = `${
    boxHeight - resolutionValues.questionFont - (lines.length - 1) * 3
  }px calibre`;
  if (lines.length === 1) {
    context.fillText(question, width / 2, height * 0.4);
  } else {
    const textLines = boxHeight / lines.length;
    for (let i = 0; i < lines.length; i++) {
      const textLine = textLines + i * resolutionValues.questionLineSpacing;
      context.fillText(lines[i], width / 2, height * 0.37 + textLine);
    }
  }
};

export const drawOptionsBox = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  optionsRow: number = 1,
  canShowAnswer: boolean = false,
  correctOptionRowColumn: { row: number; column: number },
  resolutionValues: TemplateVariablesProps
) => {
  const widthHalf = width * 0.5;
  const questionHeight =
    height * (optionsRow === 1 ? optionsRowOne : optionRowTwo);
  const boxHeight = height * 0.025;
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
  context.lineWidth = resolutionValues.lineWidth;
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
  context.lineWidth = resolutionValues.lineWidth;
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
  const questionHeight =
    height * (optionsRow === 1 ? optionsRowOne : optionRowTwo);
  const boxHeight = height * 0.03;

  if (Boolean(optionOne)) {
    context.font = `${boxHeight - 8}px calibre`;
    context.fillStyle = "gold";
    context.fillText(
      `${optionsRow === 1 ? "A" : "C"}. `,
      widthHalf * 0.3,
      height * questionHeight
    );
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

export const drawTimerCircle = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  timerCount: number,
  resolutionValues: TemplateVariablesProps
) => {
  const centerX = width / 2;
  const centerY = height * resolutionValues.timerPosition + height * 0.01;
  context.beginPath();
  context.arc(centerX, centerY, 50, Math.PI, 0, false);
  context.lineWidth = resolutionValues.lineWidth;
  context.strokeStyle = "gold";
  context.stroke();
  context.closePath();

  context.font = `${resolutionValues.timerFont}px calibre`;
  context.fillStyle = "gold";
  context.textAlign = "center";
  context.fillText(
    `${timerCount}`,
    centerX,
    height * resolutionValues.timerNumberPosition
  );
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
