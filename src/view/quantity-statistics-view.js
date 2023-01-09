import AbstractView from '../framework/view/abstract-view.js';

const createStatisticTemplate = (filmsQuantity) => `<p>${filmsQuantity} movies inside</p>`;

export default class QuantityStatisticsView extends AbstractView {
  #filmsQuantity = null;

  constructor({filmsQuantity}) {
    super();
    this.#filmsQuantity = filmsQuantity;
  }

  get template() {
    return createStatisticTemplate(this.#filmsQuantity);
  }

}
