'use strict';

import {utils} from "../utils";

export class inputInitialPay {
  constructor(input, currency, boundedInput, rangeInput, offerFunction) {
    this._input = input;
    this._currency = currency;
    this._boundedInput = boundedInput;
    this._rangeInput = rangeInput;
    this._offerFunction = offerFunction;
  }

  init() {
    this.setHandlers();
  }

  setHandlers() {
    this._input.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      utils.addCurrencySubstr(this._input, this._currency);

      let sum = utils.inputSumToInteger(this._input);
      const value = utils.inputSumToInteger(this._boundedInput);
      const percent = value * 0.1;

      if (sum < percent) {
        this._input.value = `${percent.toLocaleString(`ru`)} ${this._currency}`;
        this._rangeInput.value = `10`;
      }

      this._offerFunction();
    });
  }
}
