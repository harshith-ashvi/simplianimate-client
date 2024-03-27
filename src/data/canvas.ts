export const aspectRatio: {
    [key: string]: { aspectRatioWidth: number; aspectRatioHeight: number };
  } = {
    Portrait: { aspectRatioWidth: 9, aspectRatioHeight: 16 },
    Landscape: { aspectRatioWidth: 16, aspectRatioHeight: 9 },
    Square: { aspectRatioWidth: 1, aspectRatioHeight: 1 },
  };