import {BlendMode, BlendModeColorSpaceMap, ColorSpace, Format} from '../types';
import {clamp01} from '../utils';

export abstract class Color {
  readonly colorspace: ColorSpace;
  readonly a: number;

  protected constructor(colorspace: ColorSpace, a: number) {
    this.colorspace = colorspace;
    this.a = clamp01(a);
  }

  get hasAlpha() {
    return this.a < 1;
  }

  /**
   * Convert this colorspace into another colorspace
   *
   * @remarks
   * This may result in loss of data if conversions are non-reversible
   */
  abstract mapTo(colorspace: ColorSpace): Color;

  /**
   * Convert this color into a css representation of this color
   * @param format An optional format type to force a format
   */
  abstract toString(format?: Format): string;

  /**
   * Linearly interpolate between this and another color by an amount following a particular blending algorithm
   *
   * If the colorspace of both colors don't match, the `other` color will be mapped to the colorspace of `this` color
   *
   * @param other - The other {@link Color} to interpolate with
   * @param f - The interpolation factor
   * @param blendMode - Optional blending algorithm to use, adjusting the colorspace if necessary,
   * both colors will be aligned
   */
  blend(other: Color, f: number, blendMode?: BlendMode): Color {
    const colorspace = blendMode ? BlendModeColorSpaceMap[blendMode] : this.colorspace;
    if (colorspace === undefined) throw new Error(`Unknown colorspace '${colorspace}'`);

    // If colors are already in the target colorspace then it's a no-op
    return this.mapTo(colorspace)._blend(other.mapTo(colorspace), f, blendMode ?? colorspace);
  }

  protected abstract _blend(other: Color, f: number, blendMode: BlendMode): Color;
}
