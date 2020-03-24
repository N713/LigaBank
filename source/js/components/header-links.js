'use strict';

const toCalculator = document.body.querySelector(`.header .header__list a[href="#calculator"]`);
const toServices = document.body.querySelector(`.header .header__list a[href="#services"]`);
const calculator = document.body.querySelector(`.form`);
const services = document.body.querySelector(`.services`);

const setHeaderLinksHandlers = () => {
  toCalculator.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    calculator.scrollIntoView({behavior: `smooth`});
  });

  toServices.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    services.scrollIntoView({behavior: `smooth`});
  });
};

export {setHeaderLinksHandlers};
