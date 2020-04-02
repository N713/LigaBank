'use strict';

import {utils, ROUBLES} from "./utils";
import {sumInput} from "./inputs/input-sum";
import {inputInitialPay} from "./inputs/input-initial-pay";
import {yearsInputSum} from "./inputs/input-years";
import {percentRange} from "./inputs/input-initial-percent";
import {yearsRangeInput} from "./inputs/input-years-range";

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

const isMotherMoneyUsed = document.body.querySelector(`.form .form__checkbox-wrapper #mother-money`);

const offer = document.body.querySelector(`.form .form__offer`);
const nonLess = document.body.querySelector(`.form .form__wrapper .non-less`);
let offerSum = offer.querySelector(`.form .form__offer-wrapper--sum h4`);
let offerPercent = offer.querySelector(`.form .form__offer-wrapper--percent h4`);
let offerMonth = offer.querySelector(`.form .form__offer-wrapper--monthly h4`);
let offerNeed = offer.querySelector(`.form .form__offer-wrapper--need h4`);

const makeOffer = () => {
  isMotherMoneyUsed.addEventListener(`change`, (evt) => {
    evt.preventDefault();

    makeOffer();
  });

  const mortgage = utils.inputSumToInteger(mortgageSum);
  const initial = utils.inputSumToInteger(initialPayment);
  let sum = mortgage - initial;

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

const mortgageSumInput = new sumInput(mortgageSum, initialPayment, mortgageSumPlus, mortgageSumMinus, ROUBLES, makeOffer);
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
