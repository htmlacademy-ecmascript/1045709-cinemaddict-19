import { remove, render, replace } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import { UpdateType, FilterType } from '../consts.js';

export default class FiltersPresenter {
  #filtersContainer = null;
  #filterModel = null;
  #filmsModel = null;

  #filterComponent = null;

  constructor({filtersContainer, filterModel, filmsModel}) {
    this.#filtersContainer = filtersContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const films = this.#filmsModel.films;

    const filters = {
      all: {
        type: FilterType.ALL,
        name: 'All movies',
        emptyFilmsMessage: 'There are no movies in our database',
        filteredFilms: [...films]
      },
      watchlist: {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        emptyFilmsMessage: 'There are no movies to watch now',
        filteredFilms: []
      },
      history: {
        type: FilterType.HISTORY,
        name: 'History',
        emptyFilmsMessage: 'There are no watched movies now',
        filteredFilms: []
      },
      favorites: {
        type: FilterType.FAVORITE,
        name: 'Favorites',
        emptyFilmsMessage: 'There are no favorite movies now',
        filteredFilms: []
      }
    };

    films.forEach((film) => {
      if (film.userDetails.watchlist) {
        filters.watchlist.filteredFilms.push(film);
      }
      if (film.userDetails.alreadyWatched) {
        filters.history.filteredFilms.push(film);
      }
      if (film.userDetails.favorite) {
        filters.favorites.filteredFilms.push(film);
      }
    });

    return filters;
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filtersContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);

  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

}
