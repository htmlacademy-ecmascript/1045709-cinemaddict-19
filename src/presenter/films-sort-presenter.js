import { render } from '../framework/render.js';
import { SortType, FILMS_TO_RENDER_QUANTITY, FILM_CARD_DATE_FORMAT } from '../consts.js';
import { humanizeDate } from '../utils.js';
import SortView from '../view/sort-view.js';

export default class FilmsSortPresenter {
  #sortContainer = null;
  #filmsPresenter = null;

  constructor({sortContainer, filmsPresenter, defaultFilms}) {
    this.#sortContainer = sortContainer;
    this.#filmsPresenter = filmsPresenter;
    this.sourcedFilms = [...defaultFilms];

    this.init();
  }

  init() {
    this.#renderSortButtons();
    this.currentSortType = SortType.DEFAULT;
  }

  #renderSortButtons() {
    render(new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    }), this.#sortContainer);
  }

  #sortFilmList(sortType) {
    this.#filmsPresenter.clearFilmList();
    switch (sortType) {
      case SortType.DEFAULT:
        this.currentSortType = SortType.DEFAULT;
        break;
      case SortType.DATE:
        this.#sortFilmsByDate();
        this.currentSortType = SortType.DATE;
        break;
      case SortType.RATING:
        this.#sortFilmsByRating();
        this.currentSortType = SortType.RATING;
    }
    this.#filmsPresenter.renderFilms(FILMS_TO_RENDER_QUANTITY);
  }

  #sortFilmsByDate() {
    this.sourcedFilms.sort((a, b) => humanizeDate(b.filmInfo.release.date, FILM_CARD_DATE_FORMAT) - humanizeDate(a.filmInfo.release.date, FILM_CARD_DATE_FORMAT));
  }

  #sortFilmsByRating() {
    this.sourcedFilms.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
  }

  #handleSortTypeChange = (sortType) => {
    this.#sortFilmList(sortType);
  };

}
