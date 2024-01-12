type numeric = `${number}`;
type degree = `${numeric}deg`;
type gradian = `${numeric}grad`;
type radian = `${numeric}rad`;
type turn = `${numeric}turn`;

export type Angle = degree | gradian | radian | turn | numeric | number;
const WORD_MATCHER = /[a-z]/i;

export function angle2deg(a: string | number) {
  if (typeof a === 'number') {
    return a;
  } else if (!isNaN(Number(a))) {
    return Number(a);
  } else {
    const opStartIndex = a.search(WORD_MATCHER);
    if (opStartIndex <= 0) throw new Error('Invalid angle');

    const numeric = Number(a.slice(0, opStartIndex));
    if (isNaN(numeric)) throw new Error('Invalid angle');

    const op = a.slice(opStartIndex);
    switch (op.toLowerCase()) {
      case 'deg':
        return numeric;
      case 'rad':
        return (numeric * 180) / Math.PI;
      case 'grad':
        return (numeric * 360) / 400;
      case 'turn':
        return numeric * 360;
      default:
        throw new Error('Invalid angle');
    }
  }
}

export function deg2rad(a: number) {
  return (a * Math.PI) / 180;
}

export function deg2angle(a: number, dp?: number): degree | '0' {
  if (a === 0) return '0';
  const rounded = (dp ? Math.round(a * 10 ** dp) / 10 ** dp : a) % 360;
  return `${rounded}deg`;
}
