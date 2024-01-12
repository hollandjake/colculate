import {describe, expect, test} from 'vitest';
import {Angle, angle2deg, deg2angle, deg2rad} from './angle';

describe('angle2deg', () => {
  test.each([
    [120, 120],
    ['120', 120],
    ['120deg', 120],
    ['2rad', 360 / Math.PI],
    ['200grad', 180],
    ['0.2turn', 72],
    [-120, -120],
    ['-120', -120],
    ['-120deg', -120],
    ['-2rad', -360 / Math.PI],
    ['-200grad', -180],
    ['-0.2turn', -72],
  ] as [Angle, number][])('angle2deg(%s) -> %d', (input: Angle, expected: number) => {
    expect(angle2deg(input)).toEqual(expected);
  });

  test.each([['invalid'], ['!deg'], ['deg'], ['25invalid']])('angle2deg(%s) throws an error', (input: string) => {
    expect(() => angle2deg(input)).toThrow();
  });
});

describe('deg2rad', () => {
  test.each([
    [0, 0],
    [180, Math.PI],
    [360, 2 * Math.PI],
  ])('deg2rad(%d) -> %d', (deg_input: number, expected_rad: number) => {
    expect(deg2rad(deg_input)).toEqual(expected_rad);
  });
});

describe('deg2angle', () => {
  test('can convert number to angle', () => {
    expect(deg2angle(5)).toEqual('5deg');
  });

  test('can convert negative angles', () => {
    expect(deg2angle(-5)).toEqual('-5deg');
  });

  test('can convert zero to angle', () => {
    expect(deg2angle(0)).toEqual('0');
  });

  test('can round to correct dp', () => {
    expect(deg2angle(3.1415926, 2)).toEqual('3.14deg');
    expect(deg2angle(-3.1415926, 2)).toEqual('-3.14deg');
  });
});
