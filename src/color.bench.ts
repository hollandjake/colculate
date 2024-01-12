import {bench, describe} from 'vitest';
import {color} from './color';

describe('color sRGB', () => {
  bench('rgbColor4', () => {
    color('rgb(5% 10% 3%)');
  });
  bench('rgbaColor4', () => {
    color('rgba(5% 10% 3% / 5%)');
  });
  bench('rgbLegacy', () => {
    color('rgb(1, 2, 3)');
  });
  bench('rgbaLegacy', () => {
    color('rgba(1, 2, 3, 0.5)');
  });
  bench('hex6', () => {
    color('#1234ab');
  });
  bench('hex8', () => {
    color('#1234abcd');
  });
  bench('hex3', () => {
    color('#123');
  });
  bench('hex4', () => {
    color('#1234');
  });
  bench('namedcolor', () => {
    color('turquoise');
  });
  bench('hslColor4', () => {
    color('hsl(40grad 10% 3%)');
  });
  bench('hslaColor4', () => {
    color('hsla(5turn 10% 3% / 5%)');
  });
  bench('hslLegacy', () => {
    color('hsl(40deg, 20%, 30%)');
  });
  bench('hslaLegacy', () => {
    color('hsla(1, 2%, 3%, 0.5)');
  });
  bench('hwb', () => {
    color('hwb(120 30% 50% / 50%)');
  });
});
