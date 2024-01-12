import {describe, expect, test} from 'vitest';
import {BlendMode, ColorSpace, Format, SRGBBlendMode} from '../../types';
import {Color} from '../color';
import {rgb255} from './builder';
import {SRGB} from './srgb';

describe('SRGB', () => {
  test('constructor', () => {
    const col = new SRGB(0.1, 0.2, 0.3, 0.4);
    expect(col.r).toEqual(0.1);
    expect(col.g).toEqual(0.2);
    expect(col.b).toEqual(0.3);
    expect(col.a).toEqual(0.4);
  });

  describe('mapTo', () => {
    const col = new SRGB(0.1, 0.2, 0.3, 0.4);
    test.each([['sRGB', new SRGB(0.1, 0.2, 0.3, 0.4)]] as [ColorSpace, Color][])(
      'mapTo(%s) -> %o',
      (mapper, expectedCol) => {
        expect(col.mapTo(mapper)).toEqual(expectedCol);
      }
    );
    test('invalid', () => {
      expect(() => new SRGB(0.1, 0.2, 0.3).mapTo('invalid' as ColorSpace)).toThrow();
    });
  });

  describe('toString', () => {
    test.each([
      [undefined, 'color(sRGB 0.1 0.2 0.3)'],
      ['sRGB', 'color(sRGB 0.1 0.2 0.3)'],
      ['hex', '#1A334D'],
      ['rgb', 'rgb(26 51 77)'],
      ['hsl', 'hsl(210deg 50% 20%)'],
      ['hwb', 'hwb(210deg 10% 70%)'],
    ] as [Format | undefined, string][])('toString(%s) -> %s', (format, expected) => {
      expect(new SRGB(0.1, 0.2, 0.3).toString(format)).toEqual(expected);
    });
    test('invalid', () => {
      expect(() => new SRGB(0.1, 0.2, 0.3).toString('invalid' as Format)).toThrow();
    });
  });

  describe('blend', () => {
    const COL_A = rgb255(39, 0, 214);
    const COL_B = rgb255(247, 148, 89);
    test.each([
      [COL_A, COL_B, 0.5, undefined, rgb255(143, 74, 152)],
      [COL_A, COL_B, 0.5, 'sRGB', rgb255(143, 74, 152)],
      [COL_A, COL_B, 0.5, 'rgb', rgb255(143, 74, 152)],
      [COL_A, COL_B, 0.5, 'hex', rgb255(143, 74, 152)],
      [COL_A, COL_B, 0.5, 'hsl', rgb255(25, 250, 88)],
      [COL_A, COL_B, 0.5, 'hwb', rgb255(45, 230, 96)],
    ] as [Color, Color, number, BlendMode | undefined, Color][])(
      '%s.blend(%s, %d, %s) -> %s',
      (a, b, f, blendMode, expected) => {
        expect(a.blend(b, f, blendMode).toString('rgb')).toEqual(expected.toString('rgb'));
      }
    );

    test('invalid', () => {
      expect(() => COL_A.blend(COL_B, 0.5, 'invalid' as SRGBBlendMode)).toThrow();
    });
  });
});
