import { render } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';

export default class FilmsFiltersPresenter {
  #filtersContainer = null;
  #films = null;

  constructor({filtersContainer, films}) {
    this.#filtersContainer = filtersContainer;
    this.#films = films;

    this.init();
  }

  init() {

    this.filters = {
      all: {
        filterFilms: this.#films,
        emptyFilmsMessage: 'There are no movies in our database'
      },
      watchlist: {
        filterFilms: [],
        emptyFilmsMessage: 'There are no movies to watch now'
      },
      history: {
        filterFilms: [],
        emptyFilmsMessage: 'There are no watched movies now'
      },
      favorites: {
        filterFilms: [],
        emptyFilmsMessage: 'There are no favorite movies now'
      }
    };

    this.#films.forEach((film) => {
      if (film.userDetails.watchlist) {
        this.filters.watchlist.filterFilms.push(film);
      }
      if (film.userDetails.alreadyWatched) {
        this.filters.history.filterFilms.push(film);
      }
      if (film.userDetails.favorite) {
        this.filters.favorites.filterFilms.push(film);
      }
    });

    this.#renderFilters();
    this.activeFilter = document.querySelector('.main-navigation__item--active').dataset.id;
  }

  #renderFilters() {
    render(new FiltersView({
      filmFilters: this.filters
    }), this.#filtersContainer);
  }

}
