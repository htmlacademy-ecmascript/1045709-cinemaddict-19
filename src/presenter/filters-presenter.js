import { remove } from '../framework/render.js';
import { UpdateType, FilterType } from '../consts.js';
import { renderUpdatingComponent } from '../utils.js';
import UserRankView from '../view/user-rank-view.js';
import FiltersView from '../view/filters-view.js';

export default class FiltersPresenter {
  #userRankContainer = null;
  #filtersContainer = null;
  #filterModel = null;
  #filmsModel = null;

  #userRankComponent = null;
  #filterComponent = null;

  constructor({filtersContainer, userRankContainer, filterModel, filmsModel}) {
    this.#filtersContainer = filtersContainer;
    this.#userRankContainer = userRankContainer;
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
    const prevUserRankComponent = this.#userRankComponent;
    const prevFilterComponent = this.#filterComponent;

    const watchedFilmsQuantity = filters.history.filteredFilms.length;

    this.#userRankComponent = new UserRankView({ watchedFilmsQuantity });

    this.#filterComponent = new FiltersView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    renderUpdatingComponent(this.#userRankContainer, this.#userRankComponent, prevUserRankComponent);
    renderUpdatingComponent(this.#filtersContainer, this.#filterComponent, prevFilterComponent);

    if (watchedFilmsQuantity === 0) {
      remove(this.#userRankComponent);
      this.#userRankComponent = null;
    }

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
