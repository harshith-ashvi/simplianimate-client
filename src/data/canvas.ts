export const aspectRatio: {
  [key: string]: {
    aspectRatioWidth: number;
    aspectRatioHeight: number;
    desiredWidth: number;
    desiredHeight: number;
  };
} = {
  Portrait: {
    aspectRatioWidth: 9,
    aspectRatioHeight: 16,
    desiredWidth: 1080,
    desiredHeight: 1920,
  },
  Landscape: {
    aspectRatioWidth: 16,
    aspectRatioHeight: 9,
    desiredWidth: 1920,
    desiredHeight: 1080,
  },
  Square: {
    aspectRatioWidth: 1,
    aspectRatioHeight: 1,
    desiredWidth: 1080,
    desiredHeight: 1080,
  },
};
