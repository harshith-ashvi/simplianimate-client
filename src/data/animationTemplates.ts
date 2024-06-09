import textFlyers from "@/assets/gif/textFlyers.gif";
import matrixRain from "@/assets/gif/matrixRain.gif";
import textReveal from "@/assets/gif/textReveal.gif";
import kannadadaKotyadipath from "@/assets/gif/kannadadaKotyadipathi.gif";

export const textBasedAnimation: {
  name: string;
  url: string;
  img: string;
}[] = [
  {
    name: "Text Flyers",
    url: "/text-flyers",
    img: textFlyers,
  },
  {
    name: "Matrix Rain",
    url: "/matrix-rain",
    img: matrixRain,
  },
  {
    name: "Text Reveal",
    url: "/text-reveal",
    img: textReveal,
  },
];

export const imageBasedAnimation: {
  name: string;
  url: string;
  img: string;
}[] = [
  {
    name: "Image Flyers",
    url: "/image-flyers",
    img: textFlyers,
  },
];

export const otherAnimation: {
  name: string;
  url: string;
  img: string;
}[] = [
  {
    name: "Quiz",
    url: "/quiz",
    img: kannadadaKotyadipath,
  },
];
