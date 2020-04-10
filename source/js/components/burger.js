'use strict';

const burgerIcon = document.body.querySelector(`.header .icon-button`);
const burgerMenu = document.body.querySelector(`.burger`);

const setBurgerHandler = () => {
  burgerIcon.addEventListener(`click`, () => {
    burgerMenu.classList.toggle(`visually-hidden`);
  });
};

export {setBurgerHandler}
