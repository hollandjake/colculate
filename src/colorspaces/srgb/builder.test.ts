import {describe, expect, test} from 'vitest';
import {fromHEXTokens, fromHSLTokens, fromHWBTokens, fromRGBTokens, rgb255} from './builder';

test('rgb255', () => {
  const col = rgb255(25.5, 51, 76.5, 0.4);
  expect(col.r).toEqual(0.1);
  expect(col.g).toEqual(0.2);
  expect(col.b).toEqual(0.3);
  expect(col.a).toEqual(0.4);
});

describe('fromHexTokens', () => {
  test('happy path', () => {
    const col = fromHEXTokens(['336699CC']);
    expect(col.r).toEqual(0.2);
    expect(col.g).toEqual(0.4);
    expect(col.b).toEqual(0.6);
    expect(col.a).toEqual(0.8);
  });
  test('invalid hex', () => {
    expect(() => fromHEXTokens(['A'])).toThrow();
    expect(() => fromHEXTokens(['AA'])).toThrow();
    expect(() => fromHEXTokens(['GGG'])).toThrow();
    expect(() => fromHEXTokens(['GGGG'])).toThrow();
    expect(() => fromHEXTokens(['AAAAA'])).toThrow();
    expect(() => fromHEXTokens(['GGGGGG'])).toThrow();
    expect(() => fromHEXTokens(['AAAAAAA'])).toThrow();
    expect(() => fromHEXTokens(['GGGGGGGG'])).toThrow();
    expect(() => fromHEXTokens(['AAAAAAAAAA'])).toThrow();
  });
});

describe('fromRGBTokens', () => {
  test('happy path', () => {
    const col = fromRGBTokens(['51', '102', '153', '0.8'], true);
    expect(col.r).toEqual(0.2);
    expect(col.g).toEqual(0.4);
    expect(col.b).toEqual(0.6);
    expect(col.a).toEqual(0.8);
  });

  test("legacy mode doesn't allow 'none'", () => {
    expect(() => fromRGBTokens(['none', '0', '0', '0'], true)).toThrow();
    expect(() => fromRGBTokens(['0', 'none', '0', '0'], true)).toThrow();
    expect(() => fromRGBTokens(['0', '0', 'none', '0'], true)).toThrow();
    expect(() => fromRGBTokens(['0', '0', '0', 'none'], true)).toThrow();
  });

  test('invalid number of components', () => {
    expect(() => fromRGBTokens([], false)).toThrow();
    expect(() => fromRGBTokens(['0'], false)).toThrow();
    expect(() => fromRGBTokens(['0', '0'], false)).toThrow();
    expect(() => fromRGBTokens(['0', '0', '0', '0', '0'], false)).toThrow();
  });

  test('invalid components', () => {
    expect(() => fromRGBTokens(['A', '0', '0'], false)).toThrow();
    expect(() => fromRGBTokens(['0', 'A', '0'], false)).toThrow();
    expect(() => fromRGBTokens(['0', '0', 'A'], false)).toThrow();
  });

  test('percent mixture in legacy mode', () => {
    expect(() => fromRGBTokens(['5%', '0', '0'], true)).toThrow();
  });

  test('legacy mode non-integers rounded +inf', () => {
    expect(fromRGBTokens(['10.2', '20.5', '30.7'], true)).toEqual(rgb255(10, 21, 31));
  });
});

describe('fromHSLTokens', () => {
  test('happy path', () => {
    const col = fromHSLTokens(['120', '100%', '50%', '0.3'], true);
    expect(col.r).toEqual(0);
    expect(col.g).toEqual(1);
    expect(col.b).toEqual(0);
    expect(col.a).toEqual(0.3);
  });

  test("legacy mode doesn't allow 'none'", () => {
    expect(() => fromHSLTokens(['none', '0%', '0%', '0'], true)).toThrow();
    expect(() => fromHSLTokens(['0', 'none', '0%', '0'], true)).toThrow();
    expect(() => fromHSLTokens(['0', '0%', 'none', '0'], true)).toThrow();
    expect(() => fromHSLTokens(['0', '0%', '0%', 'none'], true)).toThrow();
  });

  test('invalid number of components', () => {
    expect(() => fromHSLTokens([], false)).toThrow();
    expect(() => fromHSLTokens(['0'], false)).toThrow();
    expect(() => fromHSLTokens(['0', '0%'], false)).toThrow();
    expect(() => fromHSLTokens(['0', '0%', '0%', '0', '0'], false)).toThrow();
  });

  test('invalid components', () => {
    expect(() => fromHSLTokens(['A', '0%', '0%'], false)).toThrow();
    expect(() => fromHSLTokens(['0', 'A', '0%'], false)).toThrow();
    expect(() => fromHSLTokens(['0', '0%', 'A'], false)).toThrow();
    expect(() => fromHSLTokens(['0', 'A', 'A'], false)).toThrow();
    expect(() => fromHSLTokens(['0%', '0%', '0%'], false)).toThrow();
    expect(() => fromHSLTokens(['0', '0deg', '0%'], false)).toThrow();
    expect(() => fromHSLTokens(['0', '0%', '0deg'], false)).toThrow();
  });
});

describe('fromHWBTokens', () => {
  test('happy path', () => {
    const col = fromHWBTokens(['240', '0%', '0%', '0.3'], false);
    expect(col.r).toEqual(0);
    expect(col.g).toEqual(0);
    expect(col.b).toEqual(1);
    expect(col.a).toEqual(0.3);
  });

  test("legacy mode isn't supported", () => {
    expect(() => fromHWBTokens(['0', '0%', '0%', '0'], true)).toThrow();
  });

  test('invalid number of components', () => {
    expect(() => fromHWBTokens([], false)).toThrow();
    expect(() => fromHWBTokens(['0'], false)).toThrow();
    expect(() => fromHWBTokens(['0', '0%'], false)).toThrow();
    expect(() => fromHWBTokens(['0', '0%', '0%', '0', '0'], false)).toThrow();
  });

  test('invalid components', () => {
    expect(() => fromHWBTokens(['A', '0%', '0%'], false)).toThrow();
    expect(() => fromHWBTokens(['0', 'A', '0%'], false)).toThrow();
    expect(() => fromHWBTokens(['0', '0%', 'A'], false)).toThrow();
    expect(() => fromHWBTokens(['0', 'A', 'A'], false)).toThrow();
    expect(() => fromHWBTokens(['0%', '0%', '0%'], false)).toThrow();
    expect(() => fromHWBTokens(['0', '0deg', '0%'], false)).toThrow();
    expect(() => fromHWBTokens(['0', '0%', '0deg'], false)).toThrow();
    expect(() => fromHWBTokens(['0', '0%', '0%', '0deg'], false)).toThrow();
  });
});
