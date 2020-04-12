'use strict';

import {utils} from "./utils";
import numeralize from "numeralize-ru";

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

      const value = utils.makeValue(this._input);
      const valueBounded = utils.makeValue(this._boundedInput);
      const percentRate = Number(this._rangeInput.getAttribute(`data-min`).split(`%`)[0]);
      const percent = valueBounded * (percentRate / 100);

      if (value < percent) {
        this._input.value = `${percent.toLocaleString(`ru`)} ${numeralize
          .pluralize(percent, `рубль`, `рубля`, `рублей`)}`;
        this._rangeInput.value = percentRate;
      } else {
        this._input.value = `${value.toLocaleString(`ru`)} ${numeralize
          .pluralize(value, `рубль`, `рубля`, `рублей`)}`;
        this._offerFunction();
      }
    });
  }
}
