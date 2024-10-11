export interface ASCIIEffectForm {
  screenResolution: string;
  resolution: number;
  isColored: boolean;
  symbols: string;
  imageUrl: string;
}

export interface PixelEffectFormType {
  screenResolution: string;
  resolution: number;
  shape: string;
  imageUrl: string;
}

export interface DisplacementMapEffectFormType {
  screenResolution: string;
  displacementEffectType: "Glass";
  strength: number;
  horizontalDisplacement: number;
  verticalDisplacement: number;
  imageUrl: string;
}
