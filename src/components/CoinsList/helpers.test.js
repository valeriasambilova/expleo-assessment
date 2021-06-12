import {
  getDecimalNumberWithTwoDecimals,
  convertExponentialToDecimal,
} from './helpers';

describe('returns number string with two decimals', () => {
  test.each([
    ['should return integer number with two decimals', 123, '123.00'],
    ['should return correct rounded number', 1.005, '1.01'],
  ])('%s', (_, input, expected) => {
    const calc = getDecimalNumberWithTwoDecimals(input);

    expect(calc).toEqual(expected);
  });
});

describe('converts exponential to decimal', () => {
  test.each([
    ['should handle simple integer numbers', 12345, 12345],
    ['should return big numbers in decimal view', 5.02041e12, 5020410000000],
    [
      'should return a string representing decimal view of a very small numbers received in exponential view',
      1e-8,
      '0.00000001',
    ],
  ])('%s', (_, input, expected) => {
    const calc = convertExponentialToDecimal(input);

    expect(calc).toEqual(expected);
  });
});
