import { remove, render } from '../framework/render.js';
import { SortType, DEFAULT_RENDERED_FILMS_QUANTITY, FILMS_TO_RENDER_QUANTITY } from '../consts';
import FilmSectionView from '../view/film-section-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
import EmptyFilmListView from '../view/empty-film-list-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import FilmsSortPresenter from './films-sort-presenter.js';
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
  #sortPresenter = null;

  constructor({filmsContainer, filmsModel, filmFilters}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#filmFilters = filmFilters;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    if (this.#films.length === 0) {
      this.#renderFilmsContainers();
      this.#renderEmptyFilmList();
      return;
    }
    this.#renderSort();
    this.#renderFilmsContainers();
    this.renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
    this.#renderShowMoreBtn();
    this.#renderAwardSection();
  }

  clearFilmList() {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    remove(this.#filmShowMoreBtnComponent);
    this.#renderShowMoreBtn();
  }

  renderFilms(toRenderQuantity) {
    const filmsToRender = this.#sortPresenter.currentSortType === SortType.DEFAULT ? this.#films : this.#sortPresenter.sourcedFilms;
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

  #renderSort() {
    this.#sortPresenter = new FilmsSortPresenter({
      sortContainer: this.#filmsContainer,
      filmsPresenter: this,
      defaultFilms: this.#films
    });
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

  #updateFilms(updatedFilm) {
    this.#films = this.#films.map((film) => film.id === updatedFilm.id ? updatedFilm : film);
    this.#sortPresenter.sourcedFilms = this.#sortPresenter.sourcedFilms.map((film) => film.id === updatedFilm.id ? updatedFilm : film);
  }

  #handleUpdateFilmData = (updatedFilm) => {
    this.#updateFilms(updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm, this.#filmsModel);
  };

  #handleLoadMoreButtonClick = () => {
    this.renderFilms(FILMS_TO_RENDER_QUANTITY);
  };

}
