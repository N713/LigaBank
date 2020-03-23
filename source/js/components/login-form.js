'use strict';

const loginForm = document.body.querySelector(`.login__form`);
const loginInput = document.getElementById(`login`);
const passwordInput = document.getElementById(`password`);
const showPasswordButton = loginForm.querySelector(`.login__form-wrapper .icon-button`);
const submitButton = loginForm.querySelector(`.button--submit`);

const setLoginFormHandlers = () => {
  loginForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    localStorage.setItem(`login`, loginInput.value);
    localStorage.setItem(`password`, passwordInput.value);
    submitButton.setAttribute(`disabled`, ``);
  });

  showPasswordButton.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    passwordInput.setAttribute(`type`,`text`);
  });

  showPasswordButton.addEventListener(`mouseup`, (evt) => {
    evt.preventDefault();
    passwordInput.setAttribute(`type`,`password`);
  });
};

export {setLoginFormHandlers};
