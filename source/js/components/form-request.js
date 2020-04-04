'use strict';

import IMask from "imask";

const requestField = document.body.querySelector(`.form .form__third-step`);
const numberField = requestField.querySelector(`.form__list-item--number h4`);
const goalField = requestField.querySelector(`.form__list-item--goal h4`);
const sumField = requestField.querySelector(`.form__list-item--sum h4`);
const initialField = requestField.querySelector(`.form__list-item--initial h4`);
const yearsField = requestField.querySelector(`.form__list-item--years h4`);
const sumString = requestField.querySelector(`.form__list-item--sum span`);

const nameInput = requestField.querySelector(`#client-name`);
const emailInput = requestField.querySelector(`#email`);
const telInput = requestField.querySelector(`#number`);
const form = document.body.querySelector(`.main .form`);

const telMask = IMask(telInput, {
  mask: telInput.getAttribute(`data-mask`),
});

const setRequestFields = (number, goal, sum, initial, years, stringSum) => {
  requestField.classList.remove(`visually-hidden`);

  numberField.textContent = number;
  goalField.textContent = goal;
  sumField.textContent = sum;
  initialField.textContent = initial;
  yearsField.textContent = years;
  sumString.textContent = `Стоимость ${stringSum}`;
};

const deleteShakeClass = () => {
  if (nameInput.classList.contains(`shake`)) {
    nameInput.classList.remove(`shake`);
  }

  if (telInput.classList.contains(`shake`)) {
    telInput.classList.remove(`shake`);
  }

  if (emailInput.classList.contains(`shake`)) {
    emailInput.classList.remove(`shake`);
  }
};

form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();

  if (nameInput.value === ``) {
    nameInput.classList.add(`shake`);
  }

  if (telInput.value === ``) {
    telInput.classList.add(`shake`);
  }

  if (emailInput.value === ``) {
    emailInput.classList.add(`shake`);
  }

  if (nameInput.value !== `` && telInput.value !== `` && emailInput.value !== ``) {
    localStorage.setItem(`name`, nameInput.value);
    localStorage.setItem(`tel`, telInput.value);
    localStorage.setItem(`email`, emailInput.value);
    localStorage.setItem(`number`, numberField.textContent);
    localStorage.setItem(`goal`, goalField.textContent);
    localStorage.setItem(`sum`, sumField.textContent);
    localStorage.setItem(`initial`, initialField.textContent);
    localStorage.setItem(`years`, yearsField.textContent);
  }

  setTimeout(deleteShakeClass, 800);
});

export {setRequestFields}
