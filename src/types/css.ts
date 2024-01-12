import {Angle} from './angle';
import {Percentage} from './percentage';

export type ColorSpace = 'sRGB';

export type None = 'none';
export type WS = ' ';

export type Hue = number | Angle;
export type AlphaValue = number | Percentage;
export type PercentageOrNone = Percentage | None;
export type NumberOrNone = number | None;
export type HueOrNone = Hue | None;
export type AlphaValueOrNone = AlphaValue | None;
export type OWS = '' | WS;

export type CSSColor = `color(${ColorSpace} ${string})`;
