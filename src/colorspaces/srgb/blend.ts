import {SRGB} from './srgb';
import {hslToSRGB, hwbToSRGB, SRGBToHsl, SRGBToHwb} from './utils';

export function rgbBlend(colorA: SRGB, colorB: SRGB, f: number): SRGB {
  return new SRGB(
    colorA.r + f * (colorB.r - colorA.r),
    colorA.g + f * (colorB.g - colorA.g),
    colorA.b + f * (colorB.b - colorA.b),
    colorA.a + f * (colorB.a - colorA.a)
  );
}

export function hslBlend(colorA: SRGB, colorB: SRGB, f: number): SRGB {
  const colorAHSL = SRGBToHsl(colorA.r, colorA.g, colorA.b);
  const colorBHSL = SRGBToHsl(colorB.r, colorB.g, colorB.b);

  return new SRGB(
    ...hslToSRGB(
      colorAHSL[0] + f * (colorBHSL[0] - colorAHSL[0]),
      colorAHSL[1] + f * (colorBHSL[1] - colorAHSL[1]),
      colorAHSL[2] + f * (colorBHSL[2] - colorAHSL[2])
    ),
    colorA.a + f * (colorB.a - colorA.a)
  );
}

export function hwbBlend(colorA: SRGB, colorB: SRGB, f: number): SRGB {
  const colorAHWB = SRGBToHwb(colorA.r, colorA.g, colorA.b);
  const colorBHWB = SRGBToHwb(colorB.r, colorB.g, colorB.b);

  return new SRGB(
    ...hwbToSRGB(
      colorAHWB[0] + f * (colorBHWB[0] - colorAHWB[0]),
      colorAHWB[1] + f * (colorBHWB[1] - colorAHWB[1]),
      colorAHWB[2] + f * (colorBHWB[2] - colorAHWB[2])
    ),
    colorA.a + f * (colorB.a - colorA.a)
  );
}
