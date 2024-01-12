import {f16round} from '@petamoriken/float16';
import {clamp01} from '../../utils';

export function hslToSRGB(hue: number, sat: number, light: number): [number, number, number] {
  hue %= 360;
  if (hue < 0) hue += 360;

  sat = clamp01(sat);
  light = clamp01(light);

  function f(n: number) {
    const k = (n + hue / 30) % 12;
    const a = sat * Math.min(light, 1 - light);
    return light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  }

  return [f(0), f(8), f(4)];
}

export function SRGBToHsl(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (min + max) / 2;
  const d = max - min;

  if (d !== 0) {
    s = l === 0 || l === 1 ? 0 : (max - l) / Math.min(l, 1 - l);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
    }

    h = h * 60;
  }

  return [h, s, l];
}

export function hwbToSRGB(hue: number, white: number, black: number): [number, number, number] {
  if (white + black >= 1) {
    const gray = white / (white + black);
    return [gray, gray, gray];
  }
  const n = 1 - white - black;
  const [r, g, b] = hslToSRGB(hue, 1, 0.5).map(x => f16round(x * n + white));
  return [r, g, b];
}

export function SRGBToHwb(r: number, g: number, b: number): [number, number, number] {
  const hsl = SRGBToHsl(r, g, b);
  const white = Math.min(r, g, b);
  const black = 1 - Math.max(r, g, b);
  return [hsl[0], white, black];
}
