'use strict';

const ESC_KEYCODE = 27;
const popup = document.body.querySelector(`.callback`);
const popupClose = popup.querySelector(`.icon-button`);
const container = document.body.querySelector(`.container`);

const closePopup = () => {
  popup.classList.add(`visually-hidden`);
  document.body.classList.remove(`body--dark`);
  container.classList.remove(`container--dark`);
};

const setCallbackPopupHandler = () => {
  popupClose.addEventListener(`click`, () => {
    closePopup();
  });

  document.addEventListener(`keydown`, (evt) => {
    if(evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  });
};

export {setCallbackPopupHandler}
