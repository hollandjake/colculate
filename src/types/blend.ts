import {SRGBBlendMode} from './colorspaces';
import {ColorSpace} from './css';

export type BlendMode = SRGBBlendMode;

export const BlendModeColorSpaceMap: {[key in BlendMode]: ColorSpace} = {
  sRGB: 'sRGB',
  hex: 'sRGB',
  rgb: 'sRGB',
  hsl: 'sRGB',
  hwb: 'sRGB',
};
