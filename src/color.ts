import {Color, SRGB} from './colorspaces';
import {fromHEXTokens, fromHSLTokens, fromHWBTokens, fromNamedColorTokens, fromRGBTokens} from './colorspaces/srgb';
import {ParseError} from './errors';
import {tokenize} from './tokenizer';
import {hex, hsl, hwb, namedcolor, rgb} from './types';

/**
 * Parse an RGB string into an SRGB color
 *
 * @see https://www.w3.org/TR/css-color-4/#funcdef-rgb
 *
 * This supports both CSS4 syntax and the legacy format
 * @param str The RGB CSS string
 * @returns The parsed color as its component breakdown in {@link SRGB} colorspace
 * @throws ParseError If the input string is not a valid color
 */
export function color(str: rgb): SRGB;
/**
 * Parse a HEX string into an SRGB color
 *
 * @see https://www.w3.org/TR/css-color-4/#hex-notation
 *
 * @param str The HEX CSS string
 * @returns The parsed color as its component breakdown in {@link SRGB} colorspace
 * @throws ParseError If the input string is not a valid color
 */
export function color(str: hex): SRGB;
/**
 * Parse an HSL string into an SRGB color
 *
 * @see https://www.w3.org/TR/css-color-4/#funcdef-hsl
 *
 * This supports both CSS4 syntax and the legacy format
 * @param str The HSL CSS string
 * @returns The parsed color as its component breakdown in {@link SRGB} colorspace
 * @throws ParseError If the input string is not a valid color
 */
export function color(str: hsl): SRGB;
/**
 * Parse an HWB string into an SRGB color
 *
 * @see https://www.w3.org/TR/css-color-4/#funcdef-hwb
 *
 * @param str The HWB CSS string
 * @returns The parsed color as its component breakdown in {@link SRGB} colorspace
 * @throws ParseError If the input string is not a valid color
 */
export function color(str: hwb): SRGB;
/**
 * Parse a named color string into an SRGB color
 *
 * @see https://www.w3.org/TR/css-color-4/#named-colors
 *
 * @param str The named color CSS string
 * @returns The parsed color as its component breakdown in {@link SRGB} colorspace
 * @throws ParseError If the input string is not a valid color
 */
export function color(str: namedcolor): SRGB;

/**
 * Parse a CSS String into a valid color in its relevant color space
 *
 * This supports both CSS4 colors and the legacy formats
 * @param str The CSS String
 * @returns The parsed color as its component breakdown in its relevant {@link ColorSpace color space}
 * @throws ParseError If the input string is not a valid color
 */
export function color(str: string): Color;

/**
 * Tagged template function for parsing a CSS String into a valid color in its relevant color space
 *
 * This supports both CSS4 colors and the legacy formats
 * @returns The parsed color as its component breakdown in its relevant {@link ColorSpace color space}
 * @throws ParseError If the input string is not a valid color
 */
export function color(str: TemplateStringsArray, ...placeholders: unknown[]): Color;

export function color(str: string | TemplateStringsArray, ...placeholders: unknown[]): Color {
  let parsedString = '';

  if (typeof str === 'string') {
    parsedString = str;
  } else {
    // interleave the literals with the placeholders
    for (let i = 0; i < placeholders.length; i++) {
      parsedString += str[i];
      parsedString += placeholders[i];
    }
    parsedString += str[str.length - 1];
  }

  const [op, tokens, isLegacy] = tokenize(parsedString);
  switch (op.toLowerCase()) {
    case '#':
      return fromHEXTokens(tokens);
    case 'rgb':
    case 'rgba':
      return fromRGBTokens(tokens, isLegacy);
    case 'hsl':
    case 'hsla':
      return fromHSLTokens(tokens, isLegacy);
    case 'hwb':
      return fromHWBTokens(tokens, isLegacy);
    default: {
      const matchedColor = fromNamedColorTokens(tokens);
      if (!matchedColor) throw new ParseError(`Unsupported color format provided '${str}'`);
      return matchedColor;
    }
  }
}
