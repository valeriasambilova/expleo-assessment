// receives a decimal number
// returns string of the number with two decimals
export const getDecimalNumberWithTwoDecimals = (number) =>
  Number(Math.round(number + 'e+2') + 'e-2').toFixed(2);

// receives a number
// if received number was decimal, returns number without any transformations
// if number is exponential, returns a string representing number in decimal view
export const convertExponentialToDecimal = (number) => {
  const str = number.toString();

  if (str.indexOf('e') !== -1) {
    const exponent = parseInt(str.split('-')[1], 10);
    return number.toFixed(exponent);
  } else {
    return number;
  }
};
