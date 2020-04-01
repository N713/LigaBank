'use strict';

import IMask from "imask";
import {utils, REG, ROUBLES} from "./utils";

const MOTHER_MONEY = 470000;
const LIMIT = 500000;
const YEARS = `лет`;

const mortgageSum = document.body.querySelector(`.form .form__price-wrapper-second input`);
const mortgageSumPlus = document.body.querySelector(`.form .form__price-wrapper-second .form__plus-button`);
const mortgageSumMinus = document.body.querySelector(`.form .form__price-wrapper-second .form__minus-button`);

const initialPayment = document.body.querySelector(`.form .form__initial-payment-wrapper #initial-payment`);
const initialPaymentRange = document.body.querySelector(`.form .form__initial-payment-wrapper #initial-percent`);

const yearsInput = document.body.querySelector(`.form .form__year-wrapper #years`);
const yearsRange = document.body.querySelector(`.form .form__year-wrapper #years-range`);

const step = Number(mortgageSum.getAttribute(`step`).replace(REG,''));
const min = Number(mortgageSum.getAttribute(`min`).replace(REG,''));
const max = Number(mortgageSum.getAttribute(`max`).replace(REG,''));
const currency = utils.getCurrency(mortgageSum);

const minYears = Number(yearsInput.getAttribute(`min`));
const maxYears = Number(yearsInput.getAttribute(`max`));

const isMotherMoneyUsed = document.body.querySelector(`.form .form__checkbox-wrapper #mother-money`);

const offer = document.body.querySelector(`.form .form__offer`);
const nonLess = document.body.querySelector(`.form .form__wrapper .non-less`);
let offerSum = offer.querySelector(`.form .form__offer-wrapper--sum h4`);
let offerPercent = offer.querySelector(`.form .form__offer-wrapper--percent h4`);
let offerMonth = offer.querySelector(`.form .form__offer-wrapper--monthly h4`);
let offerNeed = offer.querySelector(`.form .form__offer-wrapper--need h4`);

let sumMask = IMask(mortgageSum, {
  mask: `0[0] 000 000 ${ROUBLES}`
});

const yearsMask = IMask(yearsInput, {
  mask: `0[0] ${YEARS}`
});

const makeOffer = () => {
  isMotherMoneyUsed.addEventListener(`change`, (evt) => {
    evt.preventDefault();

    makeOffer();
  });

  const mortgage = utils.inputSumToInteger(mortgageSum);
  const initial = utils.inputSumToInteger(initialPayment);
  let sum = mortgage - initial;

  console.log(mortgage);
  console.log(initial);

  if (isMotherMoneyUsed.checked) {
    sum = sum - MOTHER_MONEY;
  }

  if (sum < LIMIT) {
    nonLess.classList.remove(`visually-hidden`);
    offer.style.display = `none`;
  } else {
    nonLess.classList.add(`visually-hidden`);
    offer.style.display = `block`;
  }

  offerSum.textContent = `${sum} ${ROUBLES}`;
};

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

const changeYears = () => {
  const value = Number(yearsInput.value.slice(0, -(YEARS.length + 1)));

  if (yearsInput.value.indexOf(YEARS) === -1) {
    yearsInput.value = `${yearsInput.value} ${YEARS}`;
  }

  if (value < minYears) {
    yearsInput.value = `${minYears} ${YEARS}`;
  }

  if (value > maxYears) {
    yearsInput.value = `${maxYears} ${YEARS}`;
  }
};

const setSumInputHandler = () => {
  utils.setPercent(initialPayment, mortgageSum);

  mortgageSum.addEventListener(`input`, () => {
    sumMask.mask = `0[0] 000 000 ${ROUBLES}`;
    mortgageSum.classList.remove(`error`);

    makeOffer();
  });

  mortgageSum.addEventListener(`change`, (evt) => {
    evt.preventDefault();
    utils.addCurrencySubstr(mortgageSum, utils.getCurrency(mortgageSum));

    const sum = utils.inputSumToInteger(mortgageSum);

    if (sum > max || sum < min) {
      sumMask.mask = `Некорректное значение`;
      mortgageSum.classList.add(`error`);
    } else {
      mortgageSum.value = `${sum} ${currency}`;
    }

    utils.setPercent(initialPayment, mortgageSum);
    makeOffer();
  });

  mortgageSumPlus.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    changeSum();
    utils.setPercent(initialPayment, mortgageSum);
    makeOffer();
  });

  mortgageSumMinus.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    changeSum(`minus`);
    utils.setPercent(initialPayment, mortgageSum);
    makeOffer();
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
      initialPaymentRange.value = `10`;
    }

    makeOffer();
  });

  initialPaymentRange.addEventListener(`input`, (evt) => {
    evt.preventDefault();

    const initialPay = utils.inputSumToInteger(mortgageSum) * (Number(initialPaymentRange.value) / 100);
    initialPayment.value = `${initialPay.toLocaleString(`ru`)} ${currency}`;

    makeOffer();
  });
};

const setYearsInputHandler = () => {
  yearsInput.addEventListener(`change`, (evt) => {
    evt.preventDefault();

    changeYears();
    makeOffer();
  });

  yearsRange.addEventListener(`input`, (evt) => {
    evt.preventDefault();

    yearsInput.value = `${yearsRange.value} ${YEARS}`;
    makeOffer();
  })
};

export {setSumInputHandler, setPercentInputHandlers, setYearsInputHandler, makeOffer};
