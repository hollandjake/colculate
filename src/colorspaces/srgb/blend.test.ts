import {describe, expect, test} from 'vitest';
import {SRGB, rgb255} from '.';
import {hslBlend, hwbBlend, rgbBlend} from './blend';

const COL_A = rgb255(39, 0, 214);
const COL_B = rgb255(247, 148, 89);

describe('rgbBlend', () => {
  test.each([
    [new SRGB(0, 0, 0, 0), new SRGB(1, 1, 1, 1), 0.5, new SRGB(0.5, 0.5, 0.5, 0.5)],
    [new SRGB(1, 1, 1, 1), new SRGB(0, 0, 0, 0), 0.5, new SRGB(0.5, 0.5, 0.5, 0.5)],
    [new SRGB(0, 0, 0, 0), new SRGB(1, 1, 1, 1), 0.25, new SRGB(0.25, 0.25, 0.25, 0.25)],
    [COL_A, COL_B, 0, COL_A],
    [COL_A, COL_B, 0.25, rgb255(91, 37, 183, 1)],
    [COL_A, COL_B, 0.5, rgb255(143, 74, 152)],
    [COL_A, COL_B, 0.75, rgb255(195, 111, 120)],
    [COL_A, COL_B, 1, COL_B],
  ] as [SRGB, SRGB, number, SRGB][])('rgbBlend(%s, %s, %d) -> %s', (a, b, f, expected) => {
    expect(rgbBlend(a, b, f).toString('hex')).toEqual(expected.toString('hex'));
  });
});

describe('hslBlend', () => {
  test.each([
    [COL_A, COL_B, 0, COL_A],
    [COL_A, COL_B, 0.25, rgb255(3, 187, 242)],
    [COL_A, COL_B, 0.5, rgb255(25, 250, 88)],
    [COL_A, COL_B, 0.75, rgb255(186, 248, 58)],
    [COL_A, COL_B, 1, COL_B],
  ] as [SRGB, SRGB, number, SRGB][])('hslBlend(%s, %s, %d) -> %s', (a, b, f, expected) => {
    expect(hslBlend(a, b, f).toString('hex')).toEqual(expected.toString('hex'));
  });
});
describe('blendMode - HWB', () => {
  test.each([
    [COL_A, COL_B, 0, COL_A],
    [COL_A, COL_B, 0.25, rgb255(22, 176, 222)],
    [COL_A, COL_B, 0.5, rgb255(45, 230, 96)],
    [COL_A, COL_B, 0.75, rgb255(183, 239, 67)],
    [COL_A, COL_B, 1, COL_B],
  ] as [SRGB, SRGB, number, SRGB][])('hwbBlend(%s, %s, %d) -> %s', (a, b, f, expected) => {
    expect(hwbBlend(a, b, f).toString('hex')).toEqual(expected.toString('hex'));
  });
});
