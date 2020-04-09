'use strict';

const ROUBLES = `рублей`;
const  FIND_SPACES_REG = /\s+/g;

const utils = {
  Position: {
    AFTERBEGIN: `afterbegin`,
    BEFOREEND: `beforeend`,
  },

  getCheckbox: (template) => {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstElementChild;
  },

  render: (container, element, place) => {
    switch (place) {
      case utils.Position.AFTERBEGIN:
        container.prepend(element);
        break;
      case utils.Position.BEFOREEND:
        container.append(element);
        break;
    }
  },

  remove: (element) => {
    if (element) {
      element.remove();
    }
  },

  appendCheckbox: (parent, template) => {
    const checkbox = utils.getCheckbox(template);
    utils.render(parent, checkbox, utils.Position.BEFOREEND);
  },

  setCurrency: (sumInput) => {
    if (sumInput.value.indexOf(ROUBLES) !== -1) {
      sumInput.value = `${sumInput.value.toLocaleString(`ru`)}`;
    } else {
      sumInput.value = `${sumInput.value.toLocaleString(`ru`)} ${ROUBLES}`;
    }
  },

  getCurrency: (sumInput) => {
    const splitValue = sumInput.value.split(` `);
    return splitValue[splitValue.length - 1];
  },

  inputSumToInteger: (input) => {
    let sum = input.value.slice(0, -(utils.getCurrency(input).length));
    return Number(sum.replace(FIND_SPACES_REG,''));
  },

  addCurrencySubstr: (input, currency) => {
    utils.setCurrency(input);

    if(input.value.indexOf(currency) !== -1) {
      input.value = `${input.value.toLocaleString(`ru`)}`;
    } else {
      input.value = `${input.value.toLocaleString(`ru`)} ${currency}`;
    }
  },

  setPercent: (to, from, number) => {
    const value = utils.inputSumToInteger(from);
    const currency = utils.getCurrency(from);
    const percent = Math.round(value * number);

    to.value = `${percent.toLocaleString(`ru`)} ${currency}`;
  },

  getIntegerValue(input, value) {
    return Number(input.getAttribute(`${value}`).replace(FIND_SPACES_REG,''));
  },

  changeSum(direction = `plus`, input, buttonPlus, buttonMinus, currency) {
    let sum = utils.inputSumToInteger(input);
    let min = this.getIntegerValue(input, `min`);
    let max = this.getIntegerValue(input, `max`);
    let step = this.getIntegerValue(input, `step`);

    if (sum <= min + step) {
      buttonMinus.setAttribute(`disabled`, ``);
    } else {
      buttonMinus.removeAttribute(`disabled`);
    }

    if (sum >= max - step) {
      buttonPlus.setAttribute(`disabled`, ``);
    } else {
      buttonPlus.removeAttribute(`disabled`);
    }

    if (direction === `plus`) {
      sum = sum + step;
      input.value = `${sum.toLocaleString(`ru`)} ${currency}`;
    }

    if (direction === `minus`) {
      sum = sum - step;
      input.value = `${sum.toLocaleString(`ru`)} ${currency}`;
    }
  },

};

export {utils, FIND_SPACES_REG, ROUBLES};
