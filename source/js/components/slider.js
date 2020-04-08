'use strict';

import Swiper from "swiper";

const toCalculatorLink = document.body.querySelector(`.slider__list .slider__list-item--initial .slider__list-item-link`);
const toDivisionsLink = document.body.querySelector(`.slider__list .slider__list-item--divisions .slider__list-item-link`);
const calculator = document.body.querySelector(`.form`);
const divisions = document.body.querySelector(`.divisions`);

const mySwiper = new Swiper(`.swiper-container`, {
  speed: 400,
  slidesPerView: 1,
  slidesPerGroup: 1,
  setWrapperSize: true,
  spaceBetween: 0,

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    dynamicBullets: true,
    dynamicMainBullets: 3,
    clickable: true,
  },

  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
});

const setSliderLinksHandlers = () => {
  toCalculatorLink.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    calculator.scrollIntoView({behavior: `smooth`});
  });

  toDivisionsLink.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    divisions.scrollIntoView({behavior: `smooth`});
  });
};

export {mySwiper, setSliderLinksHandlers}
