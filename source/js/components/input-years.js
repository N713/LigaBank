'use strict';

import {utils} from "./utils";
import numeralize from "numeralize-ru";

export class yearsInputSum {
  constructor(input, offerFunction, years, rangeInput) {
    this._input = input;
    this._years = years;
    this._offerFunction = offerFunction;
    this._rangeInput = rangeInput;
  }

  init() {
    this.setHandlers();
  }

  getRange(range) {
    return Number(this._rangeInput.getAttribute(`${range}`));
  }

  checkValue() {
    const minYears = this.getRange(`min`);
    const maxYears = this.getRange(`max`);
    const value = utils.makeValue(this._input);

    if (value < minYears || this._input.value === ``) {
      this._input.value = `${minYears} ${numeralize.pluralize(minYears, `год`, `года`, `лет`)}`;
    }

    if (value > maxYears) {
      this._input.value = `${maxYears} ${numeralize.pluralize(maxYears, `год`, `года`, `лет`)}`;
    }

    if (value >= minYears && value <= maxYears) {
      this._input.value = `${value} ${numeralize.pluralize(value, `год`, `года`, `лет`)}`;
    }

    this._rangeInput.value = `${value}`;
  }

  setHandlers() {
    this._input.addEventListener(`focus`, (evt) => {
      evt.preventDefault();

      this._input.value = ``;
    })

    this._input.addEventListener(`change`, (evt) => {
      evt.preventDefault();

      this.checkValue();
      this._offerFunction();
    });

    this._input.addEventListener(`blur`, (evt) => {
      evt.preventDefault();

      this.checkValue();
      this._offerFunction();
    });
  }
}
