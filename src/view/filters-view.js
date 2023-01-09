import AbstractView from '../framework/view/abstract-view.js';

const createFiltersTemplate = (filmFilters) => (
  `<nav class="main-navigation">
      <a href="#all" data-id="all" class="main-navigation__item main-navigation__item--active">
        All movies
      </a>
      <a href="#watchlist" data-id="watchlist" class="main-navigation__item">
        Watchlist
        <span class="main-navigation__item-count">${filmFilters.watchlist.filterFilms.length}</span>
      </a>
      <a href="#history" data-id="history" class="main-navigation__item">
        History
        <span class="main-navigation__item-count">${filmFilters.history.filterFilms.length}</span>
      </a>
      <a href="#favorites" data-id="favorites" class="main-navigation__item">
        Favorites
        <span class="main-navigation__item-count">${filmFilters.favorites.filterFilms.length}</span>
      </a>
   </nav>`
);

export default class FiltersView extends AbstractView {
  #filmFilters = null;

  constructor({filmFilters}) {
    super();
    this.#filmFilters = filmFilters;
  }

  get template() {
    return createFiltersTemplate(this.#filmFilters);
  }

}
