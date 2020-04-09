'use strict';

import Swiper from "swiper";

const SLIDE_WIDTH = 1170;
const tabs = Array.from(document.body.querySelectorAll(`.services .services__list .services__list-item`));

const tabletSwiper = new Swiper(`.swiper-container-services`, {
  breakpoints: {
    320: {
      speed: 400,
      slidesPerView: 1,
      slidesPerGroup: 1,
      setWrapperSize: true,
      simulateTouch: true,

      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        dynamicBullets: true,
        dynamicMainBullets: 4,
      }
    },

    1024: {
      simulateTouch: false,
      setWrapperSize: true,
      spaceBetween: 1000,
    },
  }
});

const setTabsHandlers = () => {
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener(`click`, (evt) => {
      evt.preventDefault();

      tabs.forEach((tab) => {
        tab.classList.remove(`services__list-item--active`);
      });

      tabs[i].classList.add(`services__list-item--active`);
      tabletSwiper.slideTo(i);
    });
  }
};

export {tabletSwiper, setTabsHandlers};
