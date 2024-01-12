export const NONE = 'none';
export const ZERO = '0';
export const NoneMapper = (token: string) => token.replace(NONE, ZERO);
export const TrailingDecimalMapper = (token: string) => (token.startsWith('.') ? `0${token}` : token);

export function clamp(num: number, min: number, max: number) {
  if (num < min) return min;
  if (num > max) return max;
  return num;
}

export function clamp01(num: number) {
  return clamp(num, 0, 1);
}

export function floatToInt255(num: number) {
  return Math.round(num * 255);
}
