'use strict';

const MOTHER_MONEY = 470000;
const ROUBLES = `рублей`;
const REG = /\s+/g;
const mortgageSum = document.body.querySelector(`.form .form__price-wrapper-second input`);
const mortgageSumPlus = document.body.querySelector(`.form .form__price-wrapper-second .form__plus-button`);
const mortgageSumMinus = document.body.querySelector(`.form .form__price-wrapper-second .form__minus-button`);
const step = Number(mortgageSum.getAttribute(`step`).replace(REG,''));
const min = Number(mortgageSum.getAttribute(`min`).replace(REG,''));
const max = Number(mortgageSum.getAttribute(`max`).replace(REG,''));
const splitValue = mortgageSum.value.split(` `);
let currency = splitValue[splitValue.length - 1];

const mortgageSumToInteger = () => {
  let sum = mortgageSum.value.slice(0, -currency.length);

  return Number(sum.replace(REG,''));
};

const changeSum = (direction = `plus`) => {
  let sum = mortgageSumToInteger();

  if (sum <= min + step) {
    mortgageSumMinus.setAttribute(`disabled`, ``);
  } else {
    mortgageSumMinus.removeAttribute(`disabled`);
  }

  if (sum >= max - step) {
    mortgageSumPlus.setAttribute(`disabled`, ``);
  } else {
    mortgageSumPlus.removeAttribute(`disabled`);
  }

  if (direction === `plus`) {
    sum = sum + step;
    mortgageSum.value = `${sum.toLocaleString(`ru`)} ${currency}`;
  }

  if (direction === `minus`) {
    sum = sum - step;
    mortgageSum.value = `${sum.toLocaleString(`ru`)} ${currency}`;
  }
};

const setSumInputHandler = () => {
  mortgageSum.addEventListener(`change`, (evt) => {
    evt.preventDefault();
    console.log(mortgageSum.value);

    if(mortgageSum.value.indexOf(currency) !== -1) {
      mortgageSum.value = `${mortgageSum.value.toLocaleString(`ru`)}`;
    } else {
      mortgageSum.value = `${mortgageSum.value.toLocaleString(`ru`)} ${currency}`;
    }

    let sum = mortgageSumToInteger();

    if (sum > max || sum < min) {
      mortgageSum.value = `Некорректное значение`;
    } else {
      mortgageSum.value = `${sum.toLocaleString(`ru`)} ${currency}`;
    }
  });

  mortgageSumPlus.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    changeSum();
  });

  mortgageSumMinus.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    changeSum(`minus`);
  })
};

export {setSumInputHandler};
