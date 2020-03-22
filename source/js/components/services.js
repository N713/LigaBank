'use strict';

const tabs = Array.from(document.body.querySelectorAll(`.services .services__list .services__list-item`));
const slides = Array.from(document.body.querySelectorAll(`.services .services__second-list .services__second-list-item`));

const setAtributes = () => {
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].setAttribute(`data-tab`, `` + i);
  }

  for (let i = 1; i < tabs.length; i++) {
    slides[i].classList.add(`visually-hidden`);
  }
};

const chooseTab = (tab) => {
  tabs.forEach((tab) => {
    tab.classList.remove(`services__list-item--active`);
  });

  if(!tabs[tab.dataset.tab].classList.contains(`services__list-item--active`)) {
    tabs[tab.dataset.tab].classList.add(`services__list-item--active`);
  }
};

const chooseSlide = (tab) => {
  slides.forEach((slide) => {
    slide.classList.add(`visually-hidden`);
  });

  if(slides[tab.dataset.tab].classList.contains(`visually-hidden`)) {
    slides[tab.dataset.tab].classList.remove(`visually-hidden`);
  }
};

const setHadlers = () => {
  setAtributes();

  tabs.forEach((it) => {
    it.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      chooseTab(it);
      chooseSlide(it);
    })
  });
};

export {setHadlers};
