'use strict';

import Swiper from "swiper";

const mySwiper = new Swiper(`.swiper-container`, {
  speed: 400,
  slidesPerView: 1,
  slidesPerGroup: 1,
  setWrapperSize: true,
  spaceBetween: 1000,

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

export {mySwiper}
