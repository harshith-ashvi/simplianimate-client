import textFlyers from "@/assets/gif/textFlyers.gif";
import matrixRain from "@/assets/gif/matrixRain.gif";
import textReveal from "@/assets/gif/textReveal.gif";
import textFalling from "@/assets/gif/textFalling.gif";
import kannadadaKotyadipath from "@/assets/gif/kannadadaKotyadipathi.gif";
import gradientArora from "@/assets/gif/gradientArora.gif";

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
  {
    name: "Text Falling",
    url: "/text-falling",
    img: textFalling,
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
  {
    name: "Gradient Arora",
    url: "/gradient-arora",
    img: gradientArora,
  },
];
