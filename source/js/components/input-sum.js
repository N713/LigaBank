'use strict';

import numeralize from "numeralize-ru";
import {utils, FIND_SPACES_REG} from "./utils";

export class sumInput {
  constructor(input, boundedInput, rangeBoundedInput, buttonPlus, buttonMinus, currency, offerFunction) {
    this._input = input;
    this._buttonPlus = buttonPlus;
    this._buttonMinus = buttonMinus;
    this._currency = currency;
    this._boundedInput = boundedInput;
    this._rangeBoundedInput = rangeBoundedInput;
    this._offerFunction = offerFunction;
  }

  init() {
    this.setHandlers();
  }

  getIntegerValue(value) {
    return Number(this._input.getAttribute(`${value}`).replace(FIND_SPACES_REG,''));
  }

  changeSum(direction = `plus`) {
    let sum = utils.inputSumToInteger(this._input);
    let min = this.getIntegerValue(`data-min`);
    let max = this.getIntegerValue(`data-max`);
    let step = this.getIntegerValue(`data-step`);

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
      this._input.value = `${sum.toLocaleString(`ru`)} ${numeralize
        .pluralize(sum, `рубль`,`рубля`, `рублей`)}`;
    }

    if (direction === `minus`) {
      sum = sum - step;
      this._input.value = `${sum.toLocaleString(`ru`)} ${numeralize
        .pluralize(sum, `рубль`,`рубля`, `рублей`)}`;
    }
  }

  setHandlers() {
    const currentPercent = Number(this._rangeBoundedInput.getAttribute(`data-min`)) / 100;
    utils.setPercent(this._boundedInput, this._input, currentPercent);

    this._input.addEventListener(`input`, () => {
      this._input.classList.remove(`error`);
      this._offerFunction();
    });

    this._input.addEventListener(`change`, (evt) => {
      evt.preventDefault();

      const value = utils.makeValue(this._input);
      let min = this.getIntegerValue(`data-min`);
      let max = this.getIntegerValue(`data-max`);

      if (value > max || value < min) {
        this._input.value = `${this._input.getAttribute(`data-error-mask`)}`;
        this._input.classList.add(`error`);
      } else {
        this._input.value = `${value.toLocaleString(`ru`)} ${numeralize
          .pluralize(value, `рубль`,`рубля`, `рублей`)}`;
      }

      utils.setPercent(this._boundedInput, this._input, currentPercent);
      this._offerFunction();
    });

    this._buttonPlus.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this.changeSum();
      utils.setPercent(this._boundedInput, this._input, currentPercent);
      this._offerFunction();
    });

    this._buttonMinus.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this.changeSum(`minus`);
      utils.setPercent(this._boundedInput, this._input, currentPercent);
      this._offerFunction();
    });
  }
}
