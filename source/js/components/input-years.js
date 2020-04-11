'use strict';

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
    const split = this._input.value.split(` `);
    const value = Number(split[0]);

    if (value < minYears) {
      this._input.value = `${minYears} ${numeralize.pluralize(minYears, `год`, `года`, `лет`)}`;
    }

    if (value > maxYears) {
      this._input.value = `${maxYears} ${numeralize.pluralize(maxYears, `год`, `года`, `лет`)}`;
    }

    if (value >= minYears && value <= maxYears) {
      this._input.value = `${value} ${numeralize.pluralize(value, `год`, `года`, `лет`)}`;
    }
  }

  setHandlers() {
    this._input.addEventListener(`change`, (evt) => {
      evt.preventDefault();

      this.checkValue();
      this._offerFunction();
    });
  }
}
