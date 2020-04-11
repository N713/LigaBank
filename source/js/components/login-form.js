'use strict';

const container = document.body.querySelector(`.container`);
const form = document.body.querySelector(`.login`);
const loginForm = document.body.querySelector(`.login__form`);
const loginInput = document.getElementById(`login`);
const passwordInput = document.getElementById(`password`);
const showPasswordButton = loginForm.querySelector(`.login__form-wrapper .icon-button`);
const submitButton = loginForm.querySelector(`.button--submit`);

const deleteShakeClass = () => {
  if (loginInput.classList.contains(`shake`)) {
    loginInput.classList.remove(`shake`);
  }

  if (passwordInput.classList.contains(`shake`)) {
    passwordInput.classList.remove(`shake`);
    showPasswordButton.classList.remove(`shake`);
  }
};

const setLoginFormHandlers = () => {
  loginForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    if (loginInput.value === ``) {
      loginInput.classList.add(`shake`);
    }

    if (passwordInput.value === ``) {
      passwordInput.classList.add(`shake`);
      showPasswordButton.classList.add(`shake`);
    }

    if (loginInput.value !== `` && passwordInput.value !== ``) {
      localStorage.setItem(`login`, loginInput.value);
      localStorage.setItem(`password`, passwordInput.value);
      form.classList.add(`visually-hidden`);
      container.classList.remove(`container--dark`);
      document.body.classList.remove(`body--dark`);

      loginInput.value = ``;
      passwordInput.value = ``;
    }

    setTimeout(deleteShakeClass, 800);
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
