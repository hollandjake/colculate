import {ColorSpace, Format} from '../../types';
import {clamp01} from '../../utils';
import {Color} from '../color';
import {SRGBToHEXString, SRGBToHSLString, SRGBToHWBString, SRGBToRGBString, SRGBToString} from './stringify';

/**
 * The sRGB color space
 * accepts three numeric parameters, representing the red, green, and blue channels of the color.
 * In-gamut colors have all three components in the range [0, 1]
 *
 * It has an optional fourth parameter representing the alpha transparency of the color, although strictly this is not part of the {@link SRGB sRGB} colorspace
 */
export class SRGB extends Color {
  readonly r: number;
  readonly g: number;
  readonly b: number;

  constructor(r: number, g: number, b: number, a = 1) {
    super('sRGB', a);
    this.r = clamp01(r);
    this.g = clamp01(g);
    this.b = clamp01(b);
  }

  mapTo(colorspace: ColorSpace): Color {
    switch (colorspace) {
      case 'sRGB':
        // No-op as it's already in the correct colorspace
        return this;
      default:
        throw new Error(`Invalid colorspace '${colorspace}'`);
    }
  }

  toString(format?: Format): string {
    switch (format) {
      case 'sRGB':
      case undefined:
        return SRGBToString(this);
      case 'hex':
        return SRGBToHEXString(this);
      case 'rgb':
        return SRGBToRGBString(this);
      case 'hsl':
        return SRGBToHSLString(this);
      case 'hwb':
        return SRGBToHWBString(this);
      default:
        throw new Error(`Invalid format option '${format}'`);
    }
  }
}
