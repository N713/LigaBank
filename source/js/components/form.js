'use strict';

const select = document.body.querySelector(`.form .form__first-step select`);
const secondStep = document.body.querySelector(`.form .form__second-step`);
const offer = document.body.querySelector(`.form .form__offer`);

const setSelectHandler = () => {
  select.addEventListener(`change`, (evt) => {
    evt.preventDefault();

    if(select.value !== `non-selected`) {
      secondStep.classList.remove(`visually-hidden`);
      offer.classList.remove(`visually-hidden`);
    } else {
      secondStep.classList.add(`visually-hidden`);
      offer.classList.add(`visually-hidden`);
    }
  });
};

export {setSelectHandler};
