/**
 * Representation of a percentage value, can either be explicitly defined with a percentage or inferred
 */
export type ExplicitPercentage = `${number}%`;
export type Percentage = ExplicitPercentage | '0';

/**
 * Converts a {@linkcode Percentage} into a numeric representation of a percentage.
 *
 * This will not check if your input fits within the `0%-100%` bounds.
 * It will only check if your input is a valid number.
 *
 * An input of `'-500%'` will result in an output of `-5`
 * @example
 * ```
 * > percentageToNumber(2.3)
 * 2.3
 * ```
 * @example
 * ```
 * > percentageToNumber('10%')
 * 0.1
 * ```
 * @example
 * ```
 * > percentageToNumber('10.3')
 * 10.3
 * ```
 *
 * @param percentage The percentage to convert. If numeric, this is a no-op
 * @param explicitPercentage Whether or not to force a string input to explicitly define a percentage symbol
 * @returns a number with a `0` representing 0% and a `1` representing 100%
 */
export function percentToNum(percentage: Percentage | number | `${number}`, explicitPercentage = false): number {
  if (typeof percentage === 'number') {
    return percentage;
  } else if (isExplicitPercentage(percentage)) {
    // Check if last character is a percent sign
    // Remove the percentage sign and then try to cast to a number
    // If it's an invalid number it will return NaN
    // Then convert percentage numeric to a float
    return Number(percentage.slice(0, -1)) / 100;
  } else if (
    !explicitPercentage ||
    percentage === '0' // Literal 0 equates to 0% and is allowed
  ) {
    return Number(percentage);
  } else {
    throw new Error('Explicit percentage not provided');
  }
}

export function isExplicitPercentage(p: string): p is ExplicitPercentage {
  return p.endsWith('%');
}

export function toPercentage(p: number, dp?: number): Percentage {
  if (p === 0) return '0';
  const percentage = p * 100;
  const rounded = dp ? Math.round(percentage * 10 ** dp) / 10 ** dp : percentage;
  return `${rounded}%`;
}
