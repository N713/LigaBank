'use strict';

import {utils, ROUBLES} from "./utils";
import {sumInput} from "./inputs/input-sum";
import {inputInitialPay} from "./inputs/input-initial-pay";
import {yearsInputSum} from "./inputs/input-years";
import {percentRange} from "./inputs/input-initial-percent";
import {yearsRangeInput} from "./inputs/input-years-range";

const MONTHS_IN_YEARS = 12;
const YEARS = `лет`;

const mortgageSum = document.body.querySelector(`.form .form__price-wrapper-second input`);
const mortgageSumPlus = document.body.querySelector(`.form .form__price-wrapper-second .form__plus-button`);
const mortgageSumMinus = document.body.querySelector(`.form .form__price-wrapper-second .form__minus-button`);

const initialPayment = document.body.querySelector(`.form .form__initial-payment-wrapper #initial-payment`);
const initialPaymentRange = document.body.querySelector(`.form .form__initial-payment-wrapper #initial-percent`);

const yearsInput = document.body.querySelector(`.form .form__year-wrapper #years`);
const yearsRange = document.body.querySelector(`.form .form__year-wrapper #years-range`);

const offer = document.body.querySelector(`.form .form__offer`);
const nonLess = document.body.querySelector(`.form .form__wrapper .non-less`);
let offerSum = offer.querySelector(`.form .form__offer-wrapper--sum h4`);
let offerPercent = offer.querySelector(`.form .form__offer-wrapper--percent h4`);
let offerMonth = offer.querySelector(`.form .form__offer-wrapper--monthly h4`);
let offerNeed = offer.querySelector(`.form .form__offer-wrapper--need h4`);

const makeOffer = () => {
  const motherMoneyCheckbox = document.body.querySelector(`.form .form__checkbox-wrapper #mother-money`);
  const carInsuranceCheckbox = document.body.querySelector(`.form .form__checkbox-wrapper #car-insurance`);
  const lifeInsuranceCheckbox = document.body.querySelector(`.form .form__checkbox-wrapper #life-insurance`);
  const salaryProjectCheckbox = document.body.querySelector(`.form .form__checkbox-wrapper #salary-project`);

  const creditSum = utils.inputSumToInteger(mortgageSum);
  const initialPay = utils.inputSumToInteger(initialPayment);
  let sum = creditSum - initialPay;
  let percent = 9.4;

  if (motherMoneyCheckbox && !carInsuranceCheckbox && !lifeInsuranceCheckbox && !salaryProjectCheckbox) {
    const percentLimit = creditSum * 0.15;
    const creditLimit = 500000;
    const motherMoney = 470000;

    if (motherMoneyCheckbox.checked) {
      sum = sum - motherMoney;
    }

    if (sum < creditLimit) {
      nonLess.classList.remove(`visually-hidden`);
      offer.style.display = `none`;
    } else {
      nonLess.classList.add(`visually-hidden`);
      offer.style.display = `block`;
    }

    if (initialPay > percentLimit) {
      percent = 8.5;
      offerPercent.textContent = `8,50%`;
    } else {
      percent = 9.5;
      offerPercent.textContent = `9,40%`;
    }
  }

  if (carInsuranceCheckbox && lifeInsuranceCheckbox && !motherMoneyCheckbox && !salaryProjectCheckbox) {
    const creditLimit = 200000;
    const sumLimit = 2000000;
    percent = 16;
    offerPercent.textContent = `16%`;

    if (creditSum > sumLimit) {
      percent = 15;
      offerPercent.textContent = `15%`;
    }

    if (carInsuranceCheckbox.checked || lifeInsuranceCheckbox.checked) {
      percent = 8.5;
      offerPercent.textContent = `8,50%`;
    }

    if (carInsuranceCheckbox.checked && lifeInsuranceCheckbox.checked) {
      percent = 3.5;
      offerPercent.textContent = `3,50%`;
    }

    if (sum < creditLimit) {
      nonLess.classList.remove(`visually-hidden`);
      offer.style.display = `none`;
    } else {
      nonLess.classList.add(`visually-hidden`);
      offer.style.display = `block`;
    }
  }

  if (salaryProjectCheckbox && !motherMoneyCheckbox && !carInsuranceCheckbox && !lifeInsuranceCheckbox) {
    const sumLowLimit = 750000;
    const sumHighLimit = 2000000;

    if (creditSum < sumLowLimit) {
      percent = 15;
      offerPercent.textContent = `15%`;
    }

    if (creditSum > sumLowLimit && creditSum < sumHighLimit) {
      percent = 12.5;
      offerPercent.textContent = `12,5%`;
    }

    if (creditSum >= sumHighLimit) {
      percent = 9.5;
      offerPercent.textContent = `9,5%`;
    }

    if (salaryProjectCheckbox.checked) {
      percent = percent - 0.5;

      const split = `${percent}`.split(`.`);
      const stringPercent = split.join(`,`) + `%`;
      offerPercent.textContent = `${stringPercent}`;
    }
  }

  const monthlyPercentRate = (percent / 100) / MONTHS_IN_YEARS;
  const numberOfPeriods = utils.inputSumToInteger(yearsInput) * MONTHS_IN_YEARS;
  const divider = Math.pow(1 + monthlyPercentRate, numberOfPeriods) - 1;
  const division = monthlyPercentRate / divider;
  const multiplier = monthlyPercentRate + division;
  const monthSum = Number((sum * multiplier).toFixed(0));
  const neededPay = Number((monthSum * 100 / 45).toFixed(0));

  offerSum.textContent = `${sum.toLocaleString(`ru`)} ${ROUBLES}`;
  offerMonth.textContent = `${monthSum.toLocaleString(`ru`)} ${ROUBLES}`;
  offerNeed.textContent = `${neededPay.toLocaleString(`ru`)} ${ROUBLES}`;
};

const mortgageSumInput = new sumInput(mortgageSum, initialPayment, initialPaymentRange, mortgageSumPlus, mortgageSumMinus, ROUBLES, makeOffer);
const initialPayInput = new inputInitialPay(initialPayment, ROUBLES, mortgageSum, initialPaymentRange, makeOffer);
const yearsSumInput = new yearsInputSum(yearsInput, makeOffer, YEARS, yearsRange);
const initialRange = new percentRange(initialPaymentRange, ROUBLES, makeOffer, mortgageSum, initialPayment);
const yearsInputRange = new yearsRangeInput(yearsRange, YEARS, makeOffer, yearsInput);

const setFormHandlers = () => {
  mortgageSumInput.init();
  yearsInputRange.init();
  initialPayInput.init();
  yearsSumInput.init();
  initialRange.init();
};

export {setFormHandlers, makeOffer};
