'use strict';

import IMask from "imask";
import {utils, REG, ROUBLES} from "./utils";

export class sumInput {
  constructor(input, boundedInput, rangeBoundedInput, buttonPlus, buttonMinus, currency, offerFunction) {
    this._input = input;
    this._buttonPlus = buttonPlus;
    this._buttonMinus = buttonMinus;
    this._currency = currency;
    this._boundedInput = boundedInput;
    this._rangeBoundedInput = rangeBoundedInput;
    this._offerFunction = offerFunction;
    this._inputMask = IMask(this._input, {
      mask: `0[0] 000 000 {рублей}`,
    });
  }

  init() {
    this.setHandlers();
  }

  getIntegerValue(value) {
    return Number(this._input.getAttribute(`${value}`).replace(REG,''));
  }

  changeSum(direction = `plus`) {
    let sum = utils.inputSumToInteger(this._input);
    let min = this.getIntegerValue(`min`);
    let max = this.getIntegerValue(`max`);
    let step = this.getIntegerValue(`step`);

    if (sum <= min + step) {
      this._buttonMinus.setAttribute(`disabled`, ``);
    } else {
      this._buttonMinus.removeAttribute(`disabled`);
    }

    if (sum >= max - step) {
      this._buttonPlus.setAttribute(`disabled`, ``);
    } else {
      this._buttonPlus.removeAttribute(`disabled`);
    }

    if (direction === `plus`) {
      sum = sum + step;
      this._input.value = `${sum.toLocaleString(`ru`)} ${this._currency}`;
    }

    if (direction === `minus`) {
      sum = sum - step;
      this._input.value = `${sum.toLocaleString(`ru`)} ${this._currency}`;
    }
  }

  setHandlers() {
    const currentPercent = Number(this._rangeBoundedInput.getAttribute(`min`)) / 100;
    utils.setPercent(this._boundedInput, this._input, currentPercent);

    this._input.addEventListener(`input`, () => {
      this._inputMask.mask = `00000000 {рублей}`;
      this._input.classList.remove(`error`);
      this._offerFunction();
    });

    this._input.addEventListener(`change`, (evt) => {
      evt.preventDefault();

      utils.addCurrencySubstr(this._input, this._currency);

      let min = this.getIntegerValue(`min`);
      let max = this.getIntegerValue(`max`);
      const sum = utils.inputSumToInteger(this._input);

      if (sum > max || sum < min) {
        this._inputMask.mask = `Некорректное значение`;
        this._input.classList.add(`error`);
      } else {
        this._inputMask.updateValue();
        this._inputMask.mask = `0[0] 000 000 рублей`;
        this._input.value = `${sum.toLocaleString(`ru`)} ${this._currency}`;
      }

      utils.setPercent(this._boundedInput, this._input, currentPercent);
      this._offerFunction();
    });

    this._buttonPlus.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this.changeSum();
      this._inputMask.updateValue();
      utils.setPercent(this._boundedInput, this._input, currentPercent);
      this._offerFunction();
    });

    this._buttonMinus.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this.changeSum(`minus`);
      this._inputMask.updateValue();
      utils.setPercent(this._boundedInput, this._input, currentPercent);
      this._offerFunction();
    });
  }
}
