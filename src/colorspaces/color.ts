import {ColorSpace, Format} from '../types';
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
}
