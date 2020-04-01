'use strict';

import IMask from "imask";
import {utils, REG, ROUBLES} from "./utils";

const MOTHER_MONEY = 470000;

const mortgageSum = document.body.querySelector(`.form .form__price-wrapper-second input`);
const mortgageSumPlus = document.body.querySelector(`.form .form__price-wrapper-second .form__plus-button`);
const mortgageSumMinus = document.body.querySelector(`.form .form__price-wrapper-second .form__minus-button`);

const initialPayment = document.body.querySelector(`.form .form__initial-payment-wrapper #initial-payment`);
const initialPaymentRange = document.body.querySelector(`.form .form__initial-payment-wrapper #initial-percent`);

const step = Number(mortgageSum.getAttribute(`step`).replace(REG,''));
const min = Number(mortgageSum.getAttribute(`min`).replace(REG,''));
const max = Number(mortgageSum.getAttribute(`max`).replace(REG,''));
const currency = utils.getCurrency(mortgageSum);

let sumMask = IMask(mortgageSum, {
  mask: `0[0] 000 000 ${ROUBLES}`
});

const changeSum = (direction = `plus`) => {
  let sum = utils.inputSumToInteger(mortgageSum);

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
  utils.setPercent(initialPayment, mortgageSum);

  mortgageSum.addEventListener(`input`, () => {
    sumMask.mask = `0[0] 000 000 ${ROUBLES}`;
  });

  mortgageSum.addEventListener(`change`, (evt) => {
    evt.preventDefault();
    utils.addCurrencySubstr(mortgageSum, utils.getCurrency(mortgageSum));

    const sum = utils.inputSumToInteger(mortgageSum);

    if (sum > max || sum < min) {
      sumMask.mask = `Некорректное значение`;
    } else {
      mortgageSum.value = `${sum} ${currency}`;
    }

    utils.setPercent(initialPayment, mortgageSum);
  });

  mortgageSumPlus.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    changeSum();
    utils.setPercent(initialPayment, mortgageSum);
  });

  mortgageSumMinus.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    changeSum(`minus`);
    utils.setPercent(initialPayment, mortgageSum);
  });
};

const setPercentInputHandlers = () => {
  initialPayment.addEventListener(`change`, (evt) => {
    evt.preventDefault();
    utils.addCurrencySubstr(initialPayment, utils.getCurrency(mortgageSum));

    let sum = utils.inputSumToInteger(initialPayment);
    const value = utils.inputSumToInteger(mortgageSum);
    const percent = value * 0.1;

    if (sum < percent) {
      initialPayment.value = `${percent.toLocaleString(`ru`)} ${currency}`;
    }
  });
};

export {setSumInputHandler, setPercentInputHandlers};
