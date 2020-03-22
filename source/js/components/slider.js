'use strict';

import Swiper from "swiper";

const mySwiper = new Swiper(`.swiper-container`, {
  speed: 400,
  spaceBetween: 10,
  slidesPerView: 1,
  slidesPerGroup: 1,
  setWrapperSize: true,

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    dynamicBullets: true,
    dynamicMainBullets: 3,
    clickable: true,
  },

  autoplay: {
    delay: 4000,
  },
});

export {mySwiper}
