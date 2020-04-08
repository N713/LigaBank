'use strict';

const ESC_KEYCODE = 27;
const loginLink = document.body.querySelector(`.header .header__login`);
const loginPopup = document.body.querySelector(`.login`);
const closePopupButton = loginPopup.querySelector(`.icon-button`);
const container = document.body.querySelector(`.container`);
const loginInput = document.getElementById(`login`);

const closeAtEsc = (evt) => {
  if(evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

const closeAtOverlay = (evt) => {
  evt.preventDefault();
  evt.stopPropagation();

  if(container.classList.contains(`container--dark`)) {
    closePopup();
  }
};

const openPopup = () => {
  loginPopup.classList.remove(`visually-hidden`);
  container.classList.add(`container--dark`);
  document.body.classList.add(`body--dark`);
  loginInput.focus();

  document.addEventListener(`keydown`, (evt) => {
    closeAtEsc(evt);
  });

  container.addEventListener(`click`, closeAtOverlay);
};

const closePopup = () => {
  loginPopup.classList.add(`visually-hidden`);
  document.body.classList.remove(`body--dark`);
  container.classList.remove(`container--dark`);

  container.removeEventListener(`click`, closeAtOverlay);
};

const setPopupHandlers = () => {
  loginLink.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    openPopup();
  });

  closePopupButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    closePopup();
  });
};

export {setPopupHandlers};
