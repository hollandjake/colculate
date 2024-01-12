import {describe, expect, test} from 'vitest';
import {SRGB} from './srgb';
import {SRGBToHEXString, SRGBToHSLString, SRGBToHWBString, SRGBToRGBString, SRGBToString} from './stringify';

const NoAlpha = new SRGB(0.1, 0.2, 0.3);
const WithAlpha = new SRGB(0.1, 0.2, 0.3, 0.4);

describe('SRGBToString', () => {
  test('NoAlpha', () => {
    expect(SRGBToString(NoAlpha)).toEqual('color(sRGB 0.1 0.2 0.3)');
  });
  test('WithAlpha', () => {
    expect(SRGBToString(WithAlpha)).toEqual('color(sRGB 0.1 0.2 0.3 / 40%)');
  });
});

describe('SRGBToHexString', () => {
  test('NoAlpha', () => {
    expect(SRGBToHEXString(NoAlpha)).toEqual('#1A334D');
  });
  test('WithAlpha', () => {
    expect(SRGBToHEXString(WithAlpha)).toEqual('#1A334D66');
  });
});

describe('SRGBToRGBString', () => {
  test('NoAlpha', () => {
    expect(SRGBToRGBString(NoAlpha)).toEqual('rgb(26 51 77)');
  });
  test('WithAlpha', () => {
    expect(SRGBToRGBString(WithAlpha)).toEqual('rgba(26 51 77 / 40%)');
  });
});

describe('SRGBToHSLString', () => {
  test('NoAlpha', () => {
    expect(SRGBToHSLString(NoAlpha)).toEqual('hsl(210deg 50% 20%)');
  });
  test('WithAlpha', () => {
    expect(SRGBToHSLString(WithAlpha)).toEqual('hsla(210deg 50% 20% / 40%)');
  });
});

describe('SRGBToHWBString', () => {
  test('NoAlpha', () => {
    expect(SRGBToHWBString(NoAlpha)).toEqual('hwb(210deg 10% 70%)');
  });
  test('WithAlpha', () => {
    expect(SRGBToHWBString(WithAlpha)).toEqual('hwb(210deg 10% 70% / 40%)');
  });
});
