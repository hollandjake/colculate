/**
 * The types as defined in the CSS color spec https://www.w3.org/TR/css-color-4
 */
import {AlphaValue, AlphaValueOrNone, Hue, HueOrNone, NumberOrNone, OWS, PercentageOrNone, WS} from '../css';
import {Percentage} from '../percentage';

export type SRGBBlendMode = 'sRGB' | 'hex' | 'rgb' | 'hsl' | 'hwb';

export type rgb = rgb_color4 | rgb_legacy;
type rgb_color4 =
  // rgb( [<percentage> | none]{3} [ / [<alpha-value> | none] ]? )
  | `rgb(${OWS}${PercentageOrNone}${WS}${PercentageOrNone}${WS}${PercentageOrNone}${OWS})`
  | `rgb(${OWS}${PercentageOrNone}${WS}${PercentageOrNone}${WS}${PercentageOrNone}${OWS}/${OWS}${AlphaValueOrNone}${OWS})`
  // rgb( [<number> | none]{3} [ / [<alpha-value> | none] ]? )
  | `rgb(${OWS}${NumberOrNone}${WS}${NumberOrNone}${WS}${NumberOrNone}${OWS})`
  | `rgb(${OWS}${NumberOrNone}${WS}${NumberOrNone}${WS}${NumberOrNone}${OWS}/${OWS}${AlphaValueOrNone}${OWS})`
  // rgba identical grammar to rgb
  | `rgba(${OWS}${PercentageOrNone}${WS}${PercentageOrNone}${WS}${PercentageOrNone}${OWS})`
  | `rgba(${OWS}${PercentageOrNone}${WS}${PercentageOrNone}${WS}${PercentageOrNone}${OWS}/${OWS}${AlphaValueOrNone}${OWS})`
  | `rgba(${OWS}${NumberOrNone}${WS}${NumberOrNone}${WS}${NumberOrNone}${OWS})`
  | `rgba(${OWS}${NumberOrNone}${WS}${NumberOrNone}${WS}${NumberOrNone}${OWS}/${OWS}${AlphaValueOrNone}${OWS})`;

type rgb_legacy =
  // rgb( <percentage>#{3} , <alpha-value>? )
  | `rgb(${OWS}${Percentage}${OWS},${OWS}${Percentage}${OWS},${OWS}${Percentage}${OWS})`
  | `rgb(${OWS}${Percentage}${OWS},${OWS}${Percentage}${OWS},${OWS}${Percentage}${OWS},${OWS}${AlphaValue}${OWS})`
  // rgb( <number>#{3} , <alpha-value>? )
  | `rgb(${OWS}${number}${OWS},${OWS}${number}${OWS},${OWS}${number}${OWS})`
  | `rgb(${OWS}${number}${OWS},${OWS}${number}${OWS},${OWS}${number}${OWS},${OWS}${AlphaValue}${OWS})`
  // rgba identical grammar to rgb
  | `rgba(${OWS}${Percentage}${OWS},${OWS}${Percentage}${OWS},${OWS}${Percentage}${OWS})`
  | `rgba(${OWS}${Percentage}${OWS},${OWS}${Percentage}${OWS},${OWS}${Percentage}${OWS},${OWS}${AlphaValue}${OWS})`
  | `rgba(${OWS}${number}${OWS},${OWS}${number}${OWS},${OWS}${number}${OWS},${OWS}${AlphaValue}${OWS})`
  | `rgba(${OWS}${number}${OWS},${OWS}${number}${OWS},${OWS}${number}${OWS})`;

export type hex = `#${string}`;

export type hsl = hsl_color4 | hsl_legacy;
type hsl_color4 =
  // hsl( [<hue> | none] [<percentage> | none] [<percentage> | none] [ / [<alpha-value> | none] ]? )
  | `hsl(${OWS}${HueOrNone}${WS}${PercentageOrNone}${WS}${PercentageOrNone}${OWS})`
  | `hsl(${OWS}${HueOrNone}${WS}${PercentageOrNone}${WS}${PercentageOrNone}${OWS}/${OWS}${AlphaValueOrNone}${OWS})`
  // hsla identical grammar to hsl
  | `hsla(${OWS}${HueOrNone}${WS}${PercentageOrNone}${WS}${PercentageOrNone}${OWS})`
  | `hsla(${OWS}${HueOrNone}${WS}${PercentageOrNone}${WS}${PercentageOrNone}${OWS}/${OWS}${AlphaValueOrNone}${OWS})`;

type hsl_legacy =
  // hsl( <hue>, <percentage>, <percentage>, <alpha-value>? )
  | `hsl(${OWS}${Hue}${OWS},${OWS}${Percentage}${OWS},${OWS}${Percentage}${OWS})`
  | `hsl(${OWS}${Hue}${OWS},${OWS}${Percentage}${OWS},${OWS}${Percentage}${OWS},${OWS}${AlphaValue}${OWS})`
  // hsla identical grammar to hsl
  | `hsla(${OWS}${Hue}${OWS},${OWS}${Percentage}${OWS},${OWS}${Percentage}${OWS},${OWS}${AlphaValue}${OWS})`
  | `hsla(${OWS}${Hue}${OWS},${OWS}${Percentage}${OWS},${OWS}${Percentage}${OWS})`;

export type hwb =
  // hwb( [<hue> | none] [<percentage> | none] [<percentage> | none] [ / [<alpha-value> | none] ]? )
  | `hwb(${OWS}${HueOrNone}${WS}${PercentageOrNone}${WS}${PercentageOrNone}${OWS})`
  | `hwb(${OWS}${HueOrNone}${WS}${PercentageOrNone}${WS}${PercentageOrNone}${OWS}/${OWS}${AlphaValueOrNone}${OWS})`;

// https://www.w3.org/TR/css-color-4/#named-colors
export type namedcolor =
  | 'aliceblue'
  | 'antiquewhite'
  | 'aqua'
  | 'aquamarine'
  | 'azure'
  | 'beige'
  | 'bisque'
  | 'black'
  | 'blanchedalmond'
  | 'blue'
  | 'blueviolet'
  | 'brown'
  | 'burlywood'
  | 'cadetblue'
  | 'chartreuse'
  | 'chocolate'
  | 'coral'
  | 'cornflowerblue'
  | 'cornsilk'
  | 'crimson'
  | 'cyan'
  | 'darkblue'
  | 'darkcyan'
  | 'darkgoldenrod'
  | 'darkgray'
  | 'darkgreen'
  | 'darkgrey'
  | 'darkkhaki'
  | 'darkmagenta'
  | 'darkolivegreen'
  | 'darkorange'
  | 'darkorchid'
  | 'darkred'
  | 'darksalmon'
  | 'darkseagreen'
  | 'darkslateblue'
  | 'darkslategray'
  | 'darkslategrey'
  | 'darkturquoise'
  | 'darkviolet'
  | 'deeppink'
  | 'deepskyblue'
  | 'dimgray'
  | 'dimgrey'
  | 'dodgerblue'
  | 'firebrick'
  | 'floralwhite'
  | 'forestgreen'
  | 'fuchsia'
  | 'gainsboro'
  | 'ghostwhite'
  | 'gold'
  | 'goldenrod'
  | 'gray'
  | 'green'
  | 'greenyellow'
  | 'grey'
  | 'honeydew'
  | 'hotpink'
  | 'indianred'
  | 'indigo'
  | 'ivory'
  | 'khaki'
  | 'lavender'
  | 'lavenderblush'
  | 'lawngreen'
  | 'lemonchiffon'
  | 'lightblue'
  | 'lightcoral'
  | 'lightcyan'
  | 'lightgoldenrodyellow'
  | 'lightgray'
  | 'lightgreen'
  | 'lightgrey'
  | 'lightpink'
  | 'lightsalmon'
  | 'lightseagreen'
  | 'lightskyblue'
  | 'lightslategray'
  | 'lightslategrey'
  | 'lightsteelblue'
  | 'lightyellow'
  | 'lime'
  | 'limegreen'
  | 'linen'
  | 'magenta'
  | 'maroon'
  | 'mediumaquamarine'
  | 'mediumblue'
  | 'mediumorchid'
  | 'mediumpurple'
  | 'mediumseagreen'
  | 'mediumslateblue'
  | 'mediumspringgreen'
  | 'mediumturquoise'
  | 'mediumvioletred'
  | 'midnightblue'
  | 'mintcream'
  | 'mistyrose'
  | 'moccasin'
  | 'navajowhite'
  | 'navy'
  | 'oldlace'
  | 'olive'
  | 'olivedrab'
  | 'orange'
  | 'orangered'
  | 'orchid'
  | 'palegoldenrod'
  | 'palegreen'
  | 'paleturquoise'
  | 'palevioletred'
  | 'papayawhip'
  | 'peachpuff'
  | 'peru'
  | 'pink'
  | 'plum'
  | 'powderblue'
  | 'purple'
  | 'rebeccapurple'
  | 'red'
  | 'rosybrown'
  | 'royalblue'
  | 'saddlebrown'
  | 'salmon'
  | 'sandybrown'
  | 'seagreen'
  | 'seashell'
  | 'sienna'
  | 'silver'
  | 'skyblue'
  | 'slateblue'
  | 'slategray'
  | 'slategrey'
  | 'snow'
  | 'springgreen'
  | 'steelblue'
  | 'tan'
  | 'teal'
  | 'thistle'
  | 'tomato'
  | 'transparent'
  | 'turquoise'
  | 'violet'
  | 'wheat'
  | 'white'
  | 'whitesmoke'
  | 'yellow'
  | 'yellowgreen';
