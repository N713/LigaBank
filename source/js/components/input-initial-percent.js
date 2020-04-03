'use strict';

import {utils} from "./utils";

export class percentRange {
  constructor(input, currency, offerFunction, boundedInput, percentInput) {
    this._input = input;
    this._currency = currency;
    this._offerFunction = offerFunction;
    this._boundedInput = boundedInput;
    this._percentInput = percentInput;
  }

  init() {
    this.setHandlers();
  }

  setHandlers() {
    this._input.addEventListener(`input`, (evt) => {
      evt.preventDefault();

      const part = Number(this._input.value) / 100;
      const mortgage = utils.inputSumToInteger(this._boundedInput);
      const initialPay = Math.round(part * mortgage);

      this._percentInput.value = `${initialPay.toLocaleString(`ru`)} ${this._currency}`;
      this._offerFunction();
    });
  }
}
