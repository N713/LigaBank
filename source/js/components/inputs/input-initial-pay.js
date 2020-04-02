'use strict';

import {utils} from "../utils";
import IMask from "imask";

export class inputInitialPay {
  constructor(input, currency, boundedInput, rangeInput, offerFunction) {
    this._input = input;
    this._currency = currency;
    this._boundedInput = boundedInput;
    this._rangeInput = rangeInput;
    this._offerFunction = offerFunction;
    this._inputMask = IMask(this._input, {
      mask: `[0] 000 000 ${this._currency}`
    });
  }

  init() {
    this.setHandlers();
  }

  setHandlers() {
    this._input.addEventListener(`input`, (evt) => {
      evt.preventDefault();

      this._inputMask.mask = `000 000[0] ${this._currency}`;
    });

    this._input.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      utils.addCurrencySubstr(this._input, this._currency);

      let sum = utils.inputSumToInteger(this._input);
      const value = utils.inputSumToInteger(this._boundedInput);
      const percent = value * (Number(this._rangeInput.getAttribute(`min`)) / 100);

      if (sum < percent) {
        this._input.value = `${percent.toLocaleString(`ru`)} ${this._currency}`;
        this._rangeInput.value = this._rangeInput.getAttribute(`min`);
      }

      const currentSum = utils.inputSumToInteger(this._input);
      this._input.value = `${currentSum.toLocaleString(`ru`)} ${this._currency}`;
      this._inputMask.mask = `${currentSum.toLocaleString(`ru`)} ${this._currency}`;

      this._offerFunction();
    });
  }
}
