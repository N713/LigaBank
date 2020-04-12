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
    const percentRate = Number(this._rangeInput.getAttribute(`data-min`).split(`%`)[0]);

    this._input.addEventListener(`focus`, (evt) => {
      evt.preventDefault();

      this._input.value = ``;
      this._rangeInput.value = percentRate;
    });

    this._input.addEventListener(`blur`, (evt) => {
      evt.preventDefault();

      const percentOfSum = utils.makeValue(this._boundedInput) * (percentRate / 100);

      if (this._input.value === ``) {
        this._input.value = `${percentOfSum.toLocaleString(`ru`)} ${numeralize
          .pluralize(percentOfSum, `рубль`, `рубля`, `рублей`)}`;
      }
    });

    this._input.addEventListener(`change`, (evt) => {
      evt.preventDefault();

      const value = utils.makeValue(this._input);
      const valueBounded = utils.makeValue(this._boundedInput);
      const percent = valueBounded * (percentRate / 100);

      if (value < percent) {
        this._input.value = `${percent.toLocaleString(`ru`)} ${numeralize
          .pluralize(percent, `рубль`, `рубля`, `рублей`)}`;
        this._rangeInput.value = percentRate;
      } else {
        this._input.value = `${value.toLocaleString(`ru`)} ${numeralize
          .pluralize(value, `рубль`, `рубля`, `рублей`)}`;
        this._offerFunction();
        this._rangeInput.value = (value / valueBounded) * 100;
      }

    });
  }
}
