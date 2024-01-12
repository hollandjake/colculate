import {deg2angle, hex, hsl, hwb, rgb, toPercentage} from '../../types';
import {floatToInt255} from '../../utils';
import {SRGB} from './srgb';
import {SRGBToHsl, SRGBToHwb} from './utils';

export function SRGBToString(color: SRGB) {
  return color.hasAlpha
    ? `color(sRGB ${color.r} ${color.g} ${color.b} / ${toPercentage(color.a, 3)})`
    : `color(sRGB ${color.r} ${color.g} ${color.b})`;
}

export function SRGBToHEXString(color: SRGB): hex {
  const rHex = floatToInt255(color.r).toString(16).toUpperCase().padStart(2, '0');
  const gHex = floatToInt255(color.g).toString(16).toUpperCase().padStart(2, '0');
  const bHex = floatToInt255(color.b).toString(16).toUpperCase().padStart(2, '0');
  return color.hasAlpha
    ? `#${rHex}${gHex}${bHex}${floatToInt255(color.a).toString(16).toUpperCase().padStart(2, '0')}`
    : `#${rHex}${gHex}${bHex}`;
}

export function SRGBToRGBString(color: SRGB): rgb {
  // Turn to 0-255 form for ease of readability by default
  const rRGB = floatToInt255(color.r);
  const gRGB = floatToInt255(color.g);
  const bRGB = floatToInt255(color.b);
  return color.hasAlpha
    ? `rgba(${rRGB} ${gRGB} ${bRGB} / ${toPercentage(color.a, 3)})`
    : `rgb(${rRGB} ${gRGB} ${bRGB})`;
}

export function SRGBToHSLString(color: SRGB): hsl {
  const [h, s, l] = SRGBToHsl(color.r, color.g, color.b);
  return color.hasAlpha
    ? `hsla(${deg2angle(h)} ${toPercentage(s, 3)} ${toPercentage(l, 3)} / ${toPercentage(color.a, 3)})`
    : `hsl(${deg2angle(h)} ${toPercentage(s, 3)} ${toPercentage(l, 3)})`;
}

export function SRGBToHWBString(color: SRGB): hwb {
  const [h, w, b] = SRGBToHwb(color.r, color.g, color.b);
  return color.hasAlpha
    ? `hwb(${deg2angle(h)} ${toPercentage(w, 3)} ${toPercentage(b, 3)} / ${toPercentage(color.a, 3)})`
    : `hwb(${deg2angle(h)} ${toPercentage(w, 3)} ${toPercentage(b, 3)})`;
}
