'use strict';

import Swiper from "swiper";

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
    }
  }
});

export {tabletSwiper};
