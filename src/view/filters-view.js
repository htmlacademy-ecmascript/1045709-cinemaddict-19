import {createElement} from '../render.js';

const createFiltersTemplate = () => (
  `<nav class="main-navigation">
      <a href="#all" data-id="all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" data-id="watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
      <a href="#history" data-id="history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
      <a href="#favorites" data-id="favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
   </nav>`
);

export default class FiltersView {
  #element = null;

  get template() {
    return createFiltersTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
