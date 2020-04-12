'use strict';

import {ROUBLES, utils} from "./utils";
import {setFormHandlers, makeOffer} from "./form-second-step";
import {appendMortgageCheckbox, appendInsuranceCheckboxes, appendSalaryCheckbox} from "./input-checkbox";

const select = document.body.querySelector(`.form .form__first-step select`);
const secondStep = document.body.querySelector(`.form .form__second-step`);
const offer = document.body.querySelector(`.form .form__offer`);

const fieldName = document.body.querySelector(`.form .form__price-wrapper label`);
const fieldLimits = document.body.querySelector(`.form .form__price-wrapper .limits`);
const sumInput = document.body.querySelector(`.form .form__price-wrapper-second #property-price`);
const sumInitialRange = document.body.querySelector(`.form .form__initial-payment-wrapper #initial-percent`);
const sumYears = document.body.querySelector(`.form .form__year-wrapper #years`);
const yearsRange = document.body.querySelector(`.form .form__year-wrapper #years-range`);
const percentRange = document.body.querySelector(`.form .form__initial-payment-wrapper #initial-percent`);
const initialPaymentsWrapper = document.body.querySelector(`.form .form__initial-payment-wrapper`);

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
  cash: `Cумма ${fieldNames.cash}`,
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

        const requestField = document.body.querySelector(`.form .form__third-step`);
        if (!requestField.classList.contains(`visually-hidden`)) {
          requestField.classList.add(`visually-hidden`);
        }

        break;

      case selectValues.home:
        showWindows();

        sumInput.setAttribute(`data-step`, fieldSteps.home);
        sumInput.setAttribute(`data-min`, fieldMins.home);
        sumInput.setAttribute(`data-max`, fieldMaxes.home);
        fieldName.textContent = fieldStrings.home;
        fieldLimits.textContent = limitsStrings.home;

        sumInitialRange.setAttribute(`value`, minPercents.home);
        sumInitialRange.setAttribute(`data-min`, minPercents.home + `%`);

        sumYears.setAttribute(`data-min`, minYears.home);
        sumYears.setAttribute(`data-max`, maxYears.home);
        yearsRange.setAttribute(`min`, minYears.home);
        yearsRange.setAttribute(`max`, maxYears.home);
        yearsRange.setAttribute(`data-min`, minYears.home + ` лет`);
        yearsRange.setAttribute(`data-max`, maxYears.home + ` лет`);
        percentRange.setAttribute(`step`, maxYears.car);

        if (initialPaymentsWrapper.classList.contains(`visually-hidden`)) {
          initialPaymentsWrapper.classList.remove(`visually-hidden`);
        }

        appendMortgageCheckbox();
        makeOffer();

        break;

      case selectValues.car:
        showWindows();

        sumInput.setAttribute(`data-step`, fieldSteps.car);
        sumInput.setAttribute(`data-min`, fieldMins.car);
        sumInput.setAttribute(`data-max`, fieldMaxes.car);
        fieldName.textContent = fieldStrings.car;
        fieldLimits.textContent = limitsStrings.car;

        sumInitialRange.setAttribute(`value`, minPercents.car);
        sumInitialRange.setAttribute(`data-min`, minPercents.car + `%`);

        sumYears.setAttribute(`data-min`, minYears.car);
        sumYears.setAttribute(`data-max`, maxYears.car);
        yearsRange.setAttribute(`min`, minYears.car);
        yearsRange.setAttribute(`max`, maxYears.car);
        yearsRange.setAttribute(`data-min`, minYears.car + ` лет`);
        yearsRange.setAttribute(`data-max`, maxYears.car + ` лет`);
        percentRange.setAttribute(`step`, maxYears.car);

        if (initialPaymentsWrapper.classList.contains(`visually-hidden`)) {
          initialPaymentsWrapper.classList.remove(`visually-hidden`);
        }

        appendInsuranceCheckboxes();
        makeOffer();

        break;

      case selectValues.cash:
        showWindows();

        sumInput.setAttribute(`data-step`, fieldSteps.cash);
        sumInput.setAttribute(`data-min`, fieldMins.cash);
        sumInput.setAttribute(`data-max`, fieldMaxes.cash);
        fieldName.textContent = fieldStrings.cash;
        fieldLimits.textContent = limitsStrings.cash;

        sumInitialRange.setAttribute(`value`, minPercents.cash);
        sumInitialRange.setAttribute(`data-min`, minPercents.cash + `%`);

        sumYears.setAttribute(`data-min`, minYears.car);
        sumYears.setAttribute(`data-max`, maxYears.cash);
        yearsRange.setAttribute(`min`, minYears.car);
        yearsRange.setAttribute(`max`, maxYears.cash);
        yearsRange.setAttribute(`data-min`, minYears.car + ` лет`);
        yearsRange.setAttribute(`data-max`, maxYears.cash + ` лет`);
        percentRange.setAttribute(`step`, minYears.car);

        if (!initialPaymentsWrapper.classList.contains(`visually-hidden`)) {
          initialPaymentsWrapper.classList.add(`visually-hidden`);
        }

        appendSalaryCheckbox();
        makeOffer();

        break;
    }
  });
};

export {setSelectHandler, setFormHandlers};
