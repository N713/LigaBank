'use strict';

const ROUBLES = `рублей`;
const REG = /\s+/g;

const utils = {
  setCurrency: (sumInput) => {
    if (sumInput.value.indexOf(ROUBLES) !== -1) {
      sumInput.value = `${sumInput.value.toLocaleString(`ru`)}`;
    } else {
      sumInput.value = `${sumInput.value.toLocaleString(`ru`)} ${ROUBLES}`;
    }
  },

  getCurrency: (sumInput) => {
    utils.setCurrency(sumInput);

    const splitValue = sumInput.value.split(` `);
    return splitValue[splitValue.length - 1];
  },

  inputSumToInteger: (input) => {
    let sum = input.value.slice(0, -(utils.getCurrency(input).length));
    return Number(sum.replace(REG,''));
  },

  addCurrencySubstr: (input, currency) => {
    if(input.value.indexOf(currency) !== -1) {
      input.value = `${input.value.toLocaleString(`ru`)}`;
    } else {
      input.value = `${input.value.toLocaleString(`ru`)} ${currency}`;
    }
  },

  setPercent: (to, from) => {
    const value = utils.inputSumToInteger(from);
    const currency = utils.getCurrency(from);
    const percent = Math.round(value * 0.1);

    to.value = `${percent.toLocaleString(`ru`)} ${currency}`;
  },
};

export {utils, REG, ROUBLES};
