'use strict';

import {ROUBLES, utils} from "./utils";
import {setFormHandlers} from "./form-second-step";
import {appendMortgageCheckbox, appendInsuranceCheckboxes, appendSalaryCheckbox} from "./inputs/input-checkbox";

const select = document.body.querySelector(`.form .form__first-step select`);
const secondStep = document.body.querySelector(`.form .form__second-step`);
const offer = document.body.querySelector(`.form .form__offer`);

const fieldName = document.body.querySelector(`.form .form__price-wrapper label`);
const fieldLimits = document.body.querySelector(`.form .form__price-wrapper span`);
const sumInput = document.body.querySelector(`.form .form__price-wrapper-second #property-price`);
const sumInitialRange = document.body.querySelector(`.form .form__initial-payment-wrapper #initial-percent`);
const sumYears = document.body.querySelector(`.form .form__year-wrapper #years`);
const yearsRange = document.body.querySelector(`.form .form__year-wrapper #years-range`);
const percentRange = document.body.querySelector(`.form .form__initial-payment-wrapper #initial-percent`);

const selectValues = {
  not: `non-selected`,
  home: `mortgage`,
  car: `carloan`,
  cash: `consumercredit`,
};

const fieldNames = {
  home: `недвижимости`,
  car: `автомобиля`,
  cash: `кредита`,
};

const fieldStrings = {
  home: `Cтоимость ${fieldNames.home}`,
  car: `Cтоимость ${fieldNames.car}`,
  cash: `Cтоимость ${fieldNames.cash}`,
};

const fieldSteps = {
  home: 100000,
  car: 50000,
  cash: 50000,
};

const fieldMins = {
  home: 1200000,
  car: 500000,
  cash: 50000,
};

const fieldMaxes = {
  home: 25000000,
  car: 5000000,
  cash: 3000000,
};

const minPercents = {
  home: 10,
  car: 20,
  cash: 0,
};

const minYears = {
  home: 5,
  car: 1,
};

const maxYears = {
  home: 30,
  car: 5,
  cash: 7,
};

const limitsStrings = {
  home: `от ${fieldMins.home.toLocaleString(`ru`)} до ${fieldMaxes.home.toLocaleString(`ru`)} ${ROUBLES}`,
  car: `от ${fieldMins.car.toLocaleString(`ru`)} до ${fieldMaxes.car.toLocaleString(`ru`)} ${ROUBLES}`,
  cash: `от ${fieldMins.cash.toLocaleString(`ru`)} до ${fieldMaxes.cash.toLocaleString(`ru`)} ${ROUBLES}`,
};

const showWindows = () => {
  secondStep.classList.remove(`visually-hidden`);
  offer.classList.remove(`visually-hidden`);
};

const hideWindows = () => {
  secondStep.classList.add(`visually-hidden`);
  offer.classList.add(`visually-hidden`);
};

const setSelectHandler = () => {
  select.addEventListener(`change`, (evt) => {
    evt.preventDefault();

    switch (select.value) {
      case selectValues.not:
        hideWindows();
        break;

      case selectValues.home:
        showWindows();

        sumInput.setAttribute(`step`, fieldSteps.home);
        sumInput.setAttribute(`min`, fieldMins.home);
        sumInput.setAttribute(`max`, fieldMaxes.home);
        fieldName.textContent = fieldStrings.home;
        fieldLimits.textContent = limitsStrings.home;

        sumInitialRange.setAttribute(`value`, minPercents.home);
        sumInitialRange.setAttribute(`min`, minPercents.home);
        sumInitialRange.setAttribute(`data-min`, minPercents.home + `%`);

        sumYears.setAttribute(`min`, minYears.home);
        sumYears.setAttribute(`max`, maxYears.home);
        yearsRange.setAttribute(`min`, minYears.home);
        yearsRange.setAttribute(`max`, maxYears.home);
        yearsRange.setAttribute(`data-min`, minYears.home + ` лет`);
        yearsRange.setAttribute(`data-max`, maxYears.home + ` лет`);
        percentRange.setAttribute(`step`, maxYears.car);

        appendMortgageCheckbox();

        break;

      case selectValues.car:
        showWindows();

        sumInput.setAttribute(`step`, fieldSteps.car);
        sumInput.setAttribute(`min`, fieldMins.car);
        sumInput.setAttribute(`max`, fieldMaxes.car);
        fieldName.textContent = fieldStrings.car;
        fieldLimits.textContent = limitsStrings.car;

        sumInitialRange.setAttribute(`value`, minPercents.car);
        sumInitialRange.setAttribute(`min`, minPercents.car);
        sumInitialRange.setAttribute(`data-min`, minPercents.car + `%`);

        sumYears.setAttribute(`min`, minYears.car);
        sumYears.setAttribute(`max`, maxYears.car);
        yearsRange.setAttribute(`min`, minYears.car);
        yearsRange.setAttribute(`max`, maxYears.car);
        yearsRange.setAttribute(`data-min`, minYears.car + ` лет`);
        yearsRange.setAttribute(`data-max`, maxYears.car + ` лет`);
        percentRange.setAttribute(`step`, maxYears.car);

        appendInsuranceCheckboxes();

        break;

      case selectValues.cash:
        showWindows();

        sumInput.setAttribute(`step`, fieldSteps.cash);
        sumInput.setAttribute(`min`, fieldMins.cash);
        sumInput.setAttribute(`max`, fieldMaxes.cash);
        fieldName.textContent = fieldStrings.cash;
        fieldLimits.textContent = limitsStrings.cash;

        sumInitialRange.setAttribute(`value`, minPercents.cash);
        sumInitialRange.setAttribute(`min`, minPercents.cash);
        sumInitialRange.setAttribute(`data-min`, minPercents.cash + `%`);

        sumYears.setAttribute(`min`, minYears.car);
        sumYears.setAttribute(`max`, maxYears.cash);
        yearsRange.setAttribute(`min`, minYears.car);
        yearsRange.setAttribute(`max`, maxYears.cash);
        yearsRange.setAttribute(`data-min`, minYears.car + ` лет`);
        yearsRange.setAttribute(`data-max`, maxYears.cash + ` лет`);
        percentRange.setAttribute(`step`, minYears.car);

        appendSalaryCheckbox();

        break;
    }
  });
};

export {setSelectHandler, setFormHandlers};
