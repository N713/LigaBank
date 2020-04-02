'use strict';

export class yearsRangeInput {
  constructor(input, years, offerFunction, yearsInput) {
    this._input = input;
    this._years = years;
    this._yearsInput = yearsInput;
    this._offerFunction = offerFunction;
  }

  init() {
    this.setHandlers();
  }

  setHandlers() {
    this._input.addEventListener(`input`, (evt) => {
      evt.preventDefault();

      this._yearsInput.value = `${this._input.value} ${this._years}`;
      this._offerFunction();
    })
  }
}
