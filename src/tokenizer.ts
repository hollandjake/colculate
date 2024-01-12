const COMMENT_MATCHER = /\/\*.*?\*\//g;
const LEGACY_SPLITTER = /\s*,\s*/;
const COLOR4_SPLITTER = /\s*\/\s*|\s+/;

function tokenizeOther(str: string): [string, string[], boolean] {
  return ['', [str.replace(COMMENT_MATCHER, ' ').trim()], false];
}

export function tokenize(str: string): [string, string[], boolean] {
  if (str.startsWith('#')) {
    return ['#', [str.substring(1)], false];
  } else {
    const argStartIndex = str.indexOf('(');
    if (argStartIndex < 0) return tokenizeOther(str);

    const argEndIndex = str.indexOf(')');
    if (argEndIndex < 0) return tokenizeOther(str);

    const op = str.substring(0, argStartIndex);
    const operandsString = str.substring(argStartIndex + 1, argEndIndex).replace(COMMENT_MATCHER, ' ');

    // Extract tokens based on color4 and legacy
    // Split on whitespace or "/" (for alpha)
    // https://www.w3.org/TR/css-color-4/#color-functions
    const isLegacy = operandsString.includes(',');
    const operands = operandsString.split(isLegacy ? LEGACY_SPLITTER : COLOR4_SPLITTER).filter(Boolean);

    return [op, operands, isLegacy];
  }
}
