'use strict';

import IMask from "imask";
import {utils, REG} from "../utils";

export class sumInput {
  constructor(input, boundedInput, buttonPlus, buttonMinus, currency, offerFunction) {
    this._input = input;
    this._buttonPlus = buttonPlus;
    this._buttonMinus = buttonMinus;
    this._currency = currency;
    this._boundedInput = boundedInput;
    this._offerFunction = offerFunction;
    this._inputMask = IMask(this._input, {
      mask: `0[0] 000 000 ${this._currency}`
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
    utils.setPercent(this._boundedInput, this._input);

    this._input.addEventListener(`input`, () => {
      this._inputMask.mask = `0[0] 000 000 ${this._currency}`;
      this._input.classList.remove(`error`);
      this._offerFunction();
    });

    this._input.addEventListener(`change`, (evt) => {
      evt.preventDefault();

      utils.addCurrencySubstr(this._input, utils.getCurrency(this._input));
      let min = this.getIntegerValue(`min`);
      let max = this.getIntegerValue(`max`);
      const sum = utils.inputSumToInteger(this._input);

      if (sum > max || sum < min) {
        this._inputMask.mask = `Некорректное значение`;
        this._input.classList.add(`error`);
      } else {
        this._input.value = `${sum} ${this._currency}`;
      }

      utils.setPercent(this._boundedInput, this._input);
      this._offerFunction();
    });

    this._buttonPlus.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this.changeSum();
      utils.setPercent(this._boundedInput, this._input);
      this._offerFunction();
    });

    this._buttonMinus.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this.changeSum(`minus`);
      utils.setPercent(this._boundedInput, this._input);
      this._offerFunction();
    });
  }
}
