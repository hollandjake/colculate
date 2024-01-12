import {describe, expect, test} from 'vitest';
import {percentToNum, toPercentage} from './percentage';

describe('percentToNum', () => {
  test.each([
    [1, 1],
    ['1', 1],
    ['1%', 0.01],
    [0, 0],
    ['0', 0],
    ['0%', 0],
    ['100%', 1],
    ['10.5%', 0.105],
    ['-5%', -0.05],
    ['200%', 2],
  ] as [Parameters<typeof percentToNum>[0], number][])('percentToNum(%s) -> %d', (input, expectedPercentage) => {
    expect(percentToNum(input)).toEqual(expectedPercentage);
  });

  test('explicitPercentage is handled correctly', () => {
    expect(() => percentToNum('5', true)).toThrow();
  });
});

describe('toPercentage', () => {
  test('zero', () => {
    expect(toPercentage(0)).toEqual('0');
  });
  test('no rounding', () => {
    expect(toPercentage(3.1415926)).toEqual('314.15926%');
  });
  test('rounding', () => {
    expect(toPercentage(3.1415926, 2)).toEqual('314.16%');
  });
});
