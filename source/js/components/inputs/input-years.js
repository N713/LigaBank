'use strict';

import IMask from "imask";
import {utils} from "../utils";

export class yearsInputSum {
  constructor(input, offerFunction, years, rangeInput) {
    this._input = input;
    this._years = years;
    this._offerFunction = offerFunction;
    this._rangeInput = rangeInput;
    const yearsMask = IMask(this._input, {
      mask: `0[0] ${this._years}`
    });
  }

  init() {
    this.setHandlers();
  }

  getIntegerValue(value) {
    return Number(this._input.getAttribute(`${value}`));
  }

  changeYears() {
    const value = Number(this._input.value.slice(0, -(this._years.length + 1)));
    const minYears = this.getIntegerValue(`min`);
    const maxYears = this.getIntegerValue(`max`);

    if (this._input.value.indexOf(this._years) === -1) {
      this._input.value = `${this._input.value} ${this._years}`;
    }

    if (value < minYears) {
      this._input.value = `${minYears} ${this._years}`;
      this._rangeInput.value = this._rangeInput.getAttribute(`min`);
    }

    if (value > maxYears) {
      this._input.value = `${maxYears} ${this._years}`;
      this._rangeInput.value = this._rangeInput.getAttribute(`max`);
    }
  }

  setHandlers() {
    this._input.addEventListener(`change`, (evt) => {
      evt.preventDefault();

      this.changeYears();
      this._offerFunction();
    });
  }
}
