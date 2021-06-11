// receives a decimal number
// returns string of the number with two decimals
export const getNumberWithTwoDecimals = (number) =>
  Number(Math.round(number.toPrecision() + 'e+2') + 'e-2').toFixed(2);

// receives a number
// returns a decimal number
export const convertExponentialToDecimal = (number) => {
  const str = number.toString();

  if (str.indexOf('e') !== -1) {
    const exponent = parseInt(str.split('-')[1], 10);
    return number.toFixed(exponent);
  } else {
    return number;
  }
};
