import {ParseError} from '../../errors';
import {Angle, angle2deg, isExplicitPercentage, namedcolor, Percentage, percentToNum} from '../../types';
import {clamp01, NONE, NoneMapper, TrailingDecimalMapper} from '../../utils';
import {SRGB} from './srgb';
import {hslToSRGB, hwbToSRGB} from './utils';

export function rgb255(r: number, g: number, b: number, a = 1): SRGB {
  return new SRGB(r / 255, g / 255, b / 255, a);
}

export function fromHEXTokens(tokens: string[]) {
  const str = tokens[0];
  const encodedHex = Number(`0x${str}`);
  switch (str.length) {
    case 3:
      if (!(encodedHex >= 0 && encodedHex <= 0xfff)) break;
      return rgb255(
        ((encodedHex & 0xf00) >> 4) | ((encodedHex & 0xf00) >> 8),
        ((encodedHex & 0x0f0) >> 0) | ((encodedHex & 0x0f0) >> 4),
        ((encodedHex & 0x00f) << 4) | ((encodedHex & 0x00f) >> 0),
        1
      );
    case 4:
      if (!(encodedHex >= 0 && encodedHex <= 0xffff)) break;
      return rgb255(
        ((encodedHex & 0xf000) >> 8) | ((encodedHex & 0xf000) >> 12),
        ((encodedHex & 0x0f00) >> 4) | ((encodedHex & 0x0f00) >> 8),
        ((encodedHex & 0x00f0) >> 0) | ((encodedHex & 0x00f0) >> 4),
        (((encodedHex & 0x000f) << 4) | ((encodedHex & 0x000f) >> 0)) / 255
      );
    case 6:
      if (!(encodedHex >= 0 && encodedHex <= 0xffffff)) break;
      return rgb255((encodedHex & 0xff0000) >> 16, (encodedHex & 0xff00) >> 8, (encodedHex & 0xff) >> 0, 1);
    case 8:
      if (!(encodedHex >= 0 && encodedHex <= 0xffffffff)) break;
      return rgb255(
        (encodedHex - (encodedHex & 0x00ffffff)) / 16 ** 6, // Funky math to avoid the 32bit signed numbers
        (encodedHex & 0x00ff0000) >> 16,
        (encodedHex & 0x0000ff00) >> 8,
        ((encodedHex & 0x000000ff) >> 0) / 255
      );
  }
  throw new ParseError(`Invalid hex color '#${str}'`);
}

export function fromRGBTokens(tokens: string[], isLegacy: boolean) {
  if (tokens.length < 3 || tokens.length > 4) throw new ParseError('The rgb/rgba function requires 3 or 4 arguments');

  tokens = tokens.map(TrailingDecimalMapper);
  let rgbComponents = tokens.slice(0, 3);
  if (isLegacy) {
    const nonNoneTokens = rgbComponents.filter(n => n !== NONE).length;
    const percentageTokens = rgbComponents.filter(isExplicitPercentage).length;
    if (percentageTokens > 0 && percentageTokens !== nonNoneTokens)
      throw new ParseError('Invalid rgb parameters - Values must be all numbers or all percentages');
  } else {
    rgbComponents = rgbComponents.map(NoneMapper);
  }

  const numericMapper = isLegacy
    ? Math.round // If using legacy color3 then integers are only supported
    : (a: number) => a;
  const numericTokens: number[] = rgbComponents.map(t =>
    isExplicitPercentage(t) ? percentToNum(t as Percentage) : numericMapper(Number(t)) / 255
  );
  const invalidParams = numericTokens.map((t, i) => (isNaN(t) ? i : null)).filter(n => n !== null) as number[];

  let alpha = 1;
  if (tokens.length === 4) alpha = percentToNum((isLegacy ? tokens[3] : NoneMapper(tokens[3])) as Percentage);
  if (isNaN(alpha)) invalidParams.push(3);

  if (invalidParams.length > 0)
    throw new ParseError(
      `Invalid rgb parameter${invalidParams.length > 1 ? 's' : ''} - ${invalidParams
        .map(i => `'${tokens[i]}' at position ${i + 1}`)
        .join(', ')}`
    );

  return new SRGB(numericTokens[0], numericTokens[1], numericTokens[2], alpha);
}

export function fromHSLTokens(tokens: string[], isLegacy: boolean) {
  if (tokens.length < 3 || tokens.length > 4) throw new ParseError('The hsl/hsla function requires 3 or 4 arguments');

  if (!isLegacy) tokens = tokens.map(NoneMapper);

  const invalidParams = [];

  let hue = 0;
  try {
    hue = angle2deg(tokens[0] as Angle);
  } catch {
    invalidParams.push(`'${tokens[0]}' is not a valid angle`);
  }

  let saturation = 0;
  try {
    saturation = percentToNum(tokens[1] as Percentage, true);
  } catch {
    invalidParams.push(`'${tokens[1]}' is not a percentage`);
  }

  let lightness = 0;
  try {
    lightness = percentToNum(tokens[2] as Percentage, true);
  } catch {
    invalidParams.push(`'${tokens[2]}' is not a percentage`);
  }

  let alpha = 1;
  if (tokens.length === 4) {
    alpha = percentToNum(tokens[3] as Percentage);
    if (isNaN(alpha)) invalidParams.push(`'${tokens[3]}' is not a percentage`);
  }

  if (invalidParams.length > 0)
    throw new ParseError(`Invalid hsl parameter${invalidParams.length > 1 ? 's' : ''} - ${invalidParams.join(', ')}`);

  const [r, g, b] = hslToSRGB(hue, saturation, lightness);
  return new SRGB(r, g, b, alpha);
}

export function fromHWBTokens(tokens: string[], isLegacy: boolean) {
  if (isLegacy) throw new ParseError("The hwb function doesn't accept legacy format");
  if (tokens.length < 3 || tokens.length > 4) throw new ParseError('The hwb function requires 3 or 4 arguments');

  tokens = tokens.map(NoneMapper);

  const invalidParams = [];

  let hue = 0;
  try {
    hue = angle2deg(tokens[0] as Angle);
  } catch {
    invalidParams.push(`'${tokens[0]}' is not a valid angle`);
  }

  const white = percentToNum((isExplicitPercentage(tokens[1]) ? tokens[1] : `${tokens[1]}%`) as Percentage);
  if (isNaN(white)) invalidParams.push(`'${tokens[1]}' is not a percentage`);

  const black = percentToNum((isExplicitPercentage(tokens[2]) ? tokens[2] : `${tokens[2]}%`) as Percentage);
  if (isNaN(black)) invalidParams.push(`'${tokens[2]}' is not a percentage`);

  let alpha = 1;
  if (tokens.length === 4) {
    alpha = percentToNum(tokens[3] as Percentage);
    if (isNaN(alpha)) invalidParams.push(`'${tokens[3]}' is not a percentage`);
  }

  if (invalidParams.length > 0)
    throw new ParseError(`Invalid hwb parameter${invalidParams.length > 1 ? 's' : ''} - ${invalidParams.join(', ')}`);

  const [r, g, b] = hwbToSRGB(hue, clamp01(white), clamp01(black));
  return new SRGB(r, g, b, alpha);
}

export function fromNamedColorTokens(tokens: string[]) {
  const word = tokens[0];
  const ALPHA_MATCHER = /[^a-zA-Z]/;
  if (ALPHA_MATCHER.test(word)) throw new ParseError('Invalid character in color name, must be alpha characters only');
  return NAMED_COLORS[word.toLowerCase() as namedcolor];
}

type named_color_type = {[key in namedcolor]: SRGB};
export const NAMED_COLORS: Readonly<named_color_type> = {
  aliceblue: rgb255(240, 248, 255),
  antiquewhite: rgb255(250, 235, 215),
  aqua: rgb255(0, 255, 255),
  aquamarine: rgb255(127, 255, 212),
  azure: rgb255(240, 255, 255),
  beige: rgb255(245, 245, 220),
  bisque: rgb255(255, 228, 196),
  black: rgb255(0, 0, 0),
  blanchedalmond: rgb255(255, 235, 205),
  blue: rgb255(0, 0, 255),
  blueviolet: rgb255(138, 43, 226),
  brown: rgb255(165, 42, 42),
  burlywood: rgb255(222, 184, 135),
  cadetblue: rgb255(95, 158, 160),
  chartreuse: rgb255(127, 255, 0),
  chocolate: rgb255(210, 105, 30),
  coral: rgb255(255, 127, 80),
  cornflowerblue: rgb255(100, 149, 237),
  cornsilk: rgb255(255, 248, 220),
  crimson: rgb255(220, 20, 60),
  cyan: rgb255(0, 255, 255),
  darkblue: rgb255(0, 0, 139),
  darkcyan: rgb255(0, 139, 139),
  darkgoldenrod: rgb255(184, 134, 11),
  darkgray: rgb255(169, 169, 169),
  darkgreen: rgb255(0, 100, 0),
  darkgrey: rgb255(169, 169, 169),
  darkkhaki: rgb255(189, 183, 107),
  darkmagenta: rgb255(139, 0, 139),
  darkolivegreen: rgb255(85, 107, 47),
  darkorange: rgb255(255, 140, 0),
  darkorchid: rgb255(153, 50, 204),
  darkred: rgb255(139, 0, 0),
  darksalmon: rgb255(233, 150, 122),
  darkseagreen: rgb255(143, 188, 143),
  darkslateblue: rgb255(72, 61, 139),
  darkslategray: rgb255(47, 79, 79),
  darkslategrey: rgb255(47, 79, 79),
  darkturquoise: rgb255(0, 206, 209),
  darkviolet: rgb255(148, 0, 211),
  deeppink: rgb255(255, 20, 147),
  deepskyblue: rgb255(0, 191, 255),
  dimgray: rgb255(105, 105, 105),
  dimgrey: rgb255(105, 105, 105),
  dodgerblue: rgb255(30, 144, 255),
  firebrick: rgb255(178, 34, 34),
  floralwhite: rgb255(255, 250, 240),
  forestgreen: rgb255(34, 139, 34),
  fuchsia: rgb255(255, 0, 255),
  gainsboro: rgb255(220, 220, 220),
  ghostwhite: rgb255(248, 248, 255),
  gold: rgb255(255, 215, 0),
  goldenrod: rgb255(218, 165, 32),
  gray: rgb255(128, 128, 128),
  green: rgb255(0, 128, 0),
  greenyellow: rgb255(173, 255, 47),
  grey: rgb255(128, 128, 128),
  honeydew: rgb255(240, 255, 240),
  hotpink: rgb255(255, 105, 180),
  indianred: rgb255(205, 92, 92),
  indigo: rgb255(75, 0, 130),
  ivory: rgb255(255, 255, 240),
  khaki: rgb255(240, 230, 140),
  lavender: rgb255(230, 230, 250),
  lavenderblush: rgb255(255, 240, 245),
  lawngreen: rgb255(124, 252, 0),
  lemonchiffon: rgb255(255, 250, 205),
  lightblue: rgb255(173, 216, 230),
  lightcoral: rgb255(240, 128, 128),
  lightcyan: rgb255(224, 255, 255),
  lightgoldenrodyellow: rgb255(250, 250, 210),
  lightgray: rgb255(211, 211, 211),
  lightgreen: rgb255(144, 238, 144),
  lightgrey: rgb255(211, 211, 211),
  lightpink: rgb255(255, 182, 193),
  lightsalmon: rgb255(255, 160, 122),
  lightseagreen: rgb255(32, 178, 170),
  lightskyblue: rgb255(135, 206, 250),
  lightslategray: rgb255(119, 136, 153),
  lightslategrey: rgb255(119, 136, 153),
  lightsteelblue: rgb255(176, 196, 222),
  lightyellow: rgb255(255, 255, 224),
  lime: rgb255(0, 255, 0),
  limegreen: rgb255(50, 205, 50),
  linen: rgb255(250, 240, 230),
  magenta: rgb255(255, 0, 255),
  maroon: rgb255(128, 0, 0),
  mediumaquamarine: rgb255(102, 205, 170),
  mediumblue: rgb255(0, 0, 205),
  mediumorchid: rgb255(186, 85, 211),
  mediumpurple: rgb255(147, 112, 219),
  mediumseagreen: rgb255(60, 179, 113),
  mediumslateblue: rgb255(123, 104, 238),
  mediumspringgreen: rgb255(0, 250, 154),
  mediumturquoise: rgb255(72, 209, 204),
  mediumvioletred: rgb255(199, 21, 133),
  midnightblue: rgb255(25, 25, 112),
  mintcream: rgb255(245, 255, 250),
  mistyrose: rgb255(255, 228, 225),
  moccasin: rgb255(255, 228, 181),
  navajowhite: rgb255(255, 222, 173),
  navy: rgb255(0, 0, 128),
  oldlace: rgb255(253, 245, 230),
  olive: rgb255(128, 128, 0),
  olivedrab: rgb255(107, 142, 35),
  orange: rgb255(255, 165, 0),
  orangered: rgb255(255, 69, 0),
  orchid: rgb255(218, 112, 214),
  palegoldenrod: rgb255(238, 232, 170),
  palegreen: rgb255(152, 251, 152),
  paleturquoise: rgb255(175, 238, 238),
  palevioletred: rgb255(219, 112, 147),
  papayawhip: rgb255(255, 239, 213),
  peachpuff: rgb255(255, 218, 185),
  peru: rgb255(205, 133, 63),
  pink: rgb255(255, 192, 203),
  plum: rgb255(221, 160, 221),
  powderblue: rgb255(176, 224, 230),
  purple: rgb255(128, 0, 128),
  rebeccapurple: rgb255(102, 51, 153),
  red: rgb255(255, 0, 0),
  rosybrown: rgb255(188, 143, 143),
  royalblue: rgb255(65, 105, 225),
  saddlebrown: rgb255(139, 69, 19),
  salmon: rgb255(250, 128, 114),
  sandybrown: rgb255(244, 164, 96),
  seagreen: rgb255(46, 139, 87),
  seashell: rgb255(255, 245, 238),
  sienna: rgb255(160, 82, 45),
  silver: rgb255(192, 192, 192),
  skyblue: rgb255(135, 206, 235),
  slateblue: rgb255(106, 90, 205),
  slategray: rgb255(112, 128, 144),
  slategrey: rgb255(112, 128, 144),
  snow: rgb255(255, 250, 250),
  springgreen: rgb255(0, 255, 127),
  steelblue: rgb255(70, 130, 180),
  tan: rgb255(210, 180, 140),
  teal: rgb255(0, 128, 128),
  thistle: rgb255(216, 191, 216),
  tomato: rgb255(255, 99, 71),
  transparent: rgb255(0, 0, 0, 0),
  turquoise: rgb255(64, 224, 208),
  violet: rgb255(238, 130, 238),
  wheat: rgb255(245, 222, 179),
  white: rgb255(255, 255, 255),
  whitesmoke: rgb255(245, 245, 245),
  yellow: rgb255(255, 255, 0),
  yellowgreen: rgb255(154, 205, 50),
};
