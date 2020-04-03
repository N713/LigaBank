'use strict';

import {utils} from "../utils";
import {makeOffer} from "../form-second-step";

const checkboxParent = document.body.querySelector(`.form .form__second-step`);

const inputText = {
  mortgage: `Использовать материнский капитал`,
  carInsurance: `Оформить КАСКО в нашем банке`,
  lifeInsurance: `Оформить Страхование жизни в нашем банке`,
  salaryProject: `Участник зарплатного проекта нашего банка`,
};

const checkboxTemplate = (name, id, value, text) => {
  return `<div class="form__checkbox-wrapper checkbox">
            <input type="checkbox" name="${name}" id="${id}" value="${value}" checked>
            <label for="${id}">${text}</label>
          </div>`;
};

const mortgageCheckbox = checkboxTemplate(`mother-money`, `mother-money`, `mother-money`, inputText.mortgage);
const carInsuranceCheckbox = checkboxTemplate(`car-insurance`, `car-insurance`, `car-insurance`, inputText.carInsurance);
const lifeInsurance = checkboxTemplate(`life-insurance`, `life-insurance`, `life-insurance`, inputText.lifeInsurance);
const salaryProject = checkboxTemplate(`salary-project`, `salary-project`, `salary-project`, inputText.salaryProject);

const removeCheckboxes = () => {
  const previousCheckboxes = Array.from(document.body.querySelectorAll(`.form .form__checkbox-wrapper`));

  previousCheckboxes.forEach((it) => {
    it.remove();
  });
};

const addCheckboxesListeners = (handler) => {
  const checkboxes = Array.from(document.body.querySelectorAll(`.form .form__checkbox-wrapper`));

  checkboxes.forEach((it) => {
    it.addEventListener(`change`, handler);
  });
};

const appendMortgageCheckbox = () => {
  removeCheckboxes();
  utils.appendCheckbox(checkboxParent, mortgageCheckbox);
  addCheckboxesListeners(makeOffer);
};

const appendInsuranceCheckboxes = () => {
  removeCheckboxes();
  utils.appendCheckbox(checkboxParent, carInsuranceCheckbox);
  utils.appendCheckbox(checkboxParent, lifeInsurance);
  addCheckboxesListeners(makeOffer);
};

const appendSalaryCheckbox = () => {
  removeCheckboxes();
  utils.appendCheckbox(checkboxParent, salaryProject);
  addCheckboxesListeners(makeOffer);
};

export {appendMortgageCheckbox, appendInsuranceCheckboxes, appendSalaryCheckbox};
