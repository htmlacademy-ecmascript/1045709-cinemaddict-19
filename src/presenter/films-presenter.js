import { remove, render } from '../framework/render.js';
import { DEFAULT_RENDERED_FILMS_QUANTITY, FILMS_TO_RENDER_QUANTITY } from '../consts.js';
import { SortType, sortFilmsByDate, sortFilmsByRating } from '../sort.js';
import SortView from '../view/sort-view.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
import EmptyFilmListView from '../view/empty-film-list-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import FilmPresenter from './film-presenter.js';
import AwardedFilmsPresenter from './awarded-films-presenter.js';

export default class FilmsPresenter {
  #filmSectionComponent = new FilmSectionView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #filmShowMoreBtnComponent = null;
  #filmsContainer = null;
  #filmsModel = null;
  #filmFilters = null;

  #films = [];
  #renderedFilmsCollection = this.#filmListContainerComponent.element.children;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedFilms = [];

  constructor({filmsContainer, filmsModel, filmFilters}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#filmFilters = filmFilters;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    this.#sourcedFilms = [...this.#filmsModel.films];
    if (this.#films.length === 0) {
      this.#renderFilmsContainers();
      this.#renderEmptyFilmList();
      return;
    }
    this.#renderSort();
    this.#renderFilmsContainers();
    this.#renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
    this.#renderShowMoreBtn();
    this.#renderAwardSection();
  }

  #renderSort() {
    render(new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    }), this.#filmsContainer);
  }

  #renderFilms(toRenderQuantity) {
    const filmsToRender = this.#currentSortType === SortType.DEFAULT ? this.#films : this.#sourcedFilms;
    const renderedFilmsQuantity = this.#renderedFilmsCollection.length;
    for (let i = renderedFilmsQuantity; i < renderedFilmsQuantity + toRenderQuantity; i++) {
      this.#renderFilm(filmsToRender[i]);
      const isLastFilm = !filmsToRender[this.#renderedFilmsCollection.length];
      if (isLastFilm) {
        remove(this.#filmShowMoreBtnComponent);
        return;
      }
    }
  }

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter({
      filmListContainer: this.#filmListContainerComponent.element,
      onDataChange: this.#handleUpdateFilmData
    });
    filmPresenter.init(film, this.#filmsModel);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderFilmsContainers() {
    render(this.#filmSectionComponent, this.#filmsContainer);
    render(this.#filmListComponent, this.#filmSectionComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);
  }

  #renderEmptyFilmList() {
    const activeFilter = document.querySelector('.main-navigation__item--active').dataset.id;
    render(new EmptyFilmListView(this.#filmFilters, activeFilter), this.#filmSectionComponent.element);
  }

  #renderShowMoreBtn() {
    this.#filmShowMoreBtnComponent = new ShowMoreBtnView({
      onClick: this.#handleLoadMoreButtonClick
    });
    render(this.#filmShowMoreBtnComponent, this.#filmListComponent.element);
  }

  #renderAwardSection() {
    const awardedFilmsPresenter = new AwardedFilmsPresenter({
      awardedFilmsContainer: this.#filmSectionComponent.element,
      films: this.#films
    });
    awardedFilmsPresenter.init();
  }

  #clearFilmList() {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    remove(this.#filmShowMoreBtnComponent);
  }

  #sortFilmList(sortType) {
    this.#clearFilmList();
    this.#renderShowMoreBtn();
    switch (sortType) {
      case SortType.DEFAULT:
        this.#currentSortType = SortType.DEFAULT;
        break;
      case SortType.DATE:
        sortFilmsByDate(this.#sourcedFilms);
        this.#currentSortType = SortType.DATE;
        break;
      case SortType.RATING:
        sortFilmsByRating(this.#sourcedFilms);
        this.#currentSortType = SortType.RATING;
    }
    this.#renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
  }

  #updateFilms(updatedFilm) {
    this.#films = this.#films.map((film) => film.id === updatedFilm.id ? updatedFilm : film);
    this.#sourcedFilms = this.#sourcedFilms.map((film) => film.id === updatedFilm.id ? updatedFilm : film);
  }

  #handleUpdateFilmData = (updatedFilm) => {
    this.#updateFilms(updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm, this.#filmsModel);
  };

  #handleSortTypeChange = (sortName) => {
    this.#sortFilmList(sortName);
  };

  #handleLoadMoreButtonClick = () => {
    this.#renderFilms(FILMS_TO_RENDER_QUANTITY);
  };

}
