import {
  getDecimalNumberWithTwoDecimals,
  convertExponentialToDecimal,
} from './helpers';

describe('returns number string with two decimals', () => {
  test.each([
    ['returns integer number with two decimals', 123, '123.00'],
    ['returns correct rounded number', 1.005, '1.01'],
  ])('%s', (_, input, expected) => {
    const calc = getDecimalNumberWithTwoDecimals(input);

    expect(calc).toEqual(expected);
  });
});

describe('converts exponential to decimal', () => {
  test.each([
    ['returns decimal number 1', 12345, 12345],
    ['returns decimal number 2', 5.02041e12, 5020410000000],
    [
      'returns a string representing number in decimal view',
      1e-8,
      '0.00000001',
    ],
  ])('%s', (_, input, expected) => {
    const calc = convertExponentialToDecimal(input);

    expect(calc).toEqual(expected);
  });
});
