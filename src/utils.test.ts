import {describe, expect, test} from 'vitest';
import {clamp, clamp01} from './utils';

describe('clamp', () => {
  test.each([
    [5, 1, 10, 5],
    [1, 1, 10, 1],
    [10, 1, 10, 10],
    [15, 1, 10, 10],
    [0, 1, 10, 1],
    [-1, 1, 10, 1],
    [-20, -10, -1, -10],
    [1, 0, 0, 0],
    [5, 10, 1, 10],
  ])('clamp(%d, %d, %d) -> %d', (num: number, min: number, max: number, result: number) => {
    expect(clamp(num, min, max)).toEqual(result);
  });
});

describe('clamp01', () => {
  test.each([
    [0, 0],
    [1, 1],
    [0.5, 0.5],
    [-1, 0],
    [2, 1],
  ])('clamp01(%d) -> %d', (num: number, result: number) => {
    expect(clamp01(num)).toEqual(result);
  });
});
