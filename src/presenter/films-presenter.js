import { remove, render } from '../framework/render.js';
import { DEFAULT_RENDERED_FILMS_QUANTITY, FILMS_TO_RENDER_QUANTITY } from '../consts.js';
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

  constructor({filmsContainer, filmsModel, filmFilters}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#filmFilters = filmFilters;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    this.#renderFilmsContainers();
    if (this.#films.length === 0) {
      this.#renderEmptyFilmList();
      return;
    }
    this.#renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);
    this.#renderShowMoreBtn();
    this.#renderAwardSection();
  }

  #renderFilms(toRenderQuantity) {
    const renderedFilmsQuantity = this.#renderedFilmsCollection.length;
    for (let i = renderedFilmsQuantity; i < renderedFilmsQuantity + toRenderQuantity; i++) {
      this.#renderFilm(this.#films[i]);
      const isLastFilm = !this.#films[this.#renderedFilmsCollection.length];
      if (isLastFilm) {
        this.#filmShowMoreBtnComponent.element.style.display = 'none';
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

  #clearFilmList() {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    remove(this.#filmShowMoreBtnComponent);
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
    this.#films.map((film) => film.id === updatedFilm.id ? updatedFilm : film);
  }

  #handleUpdateFilmData = (updatedFilm) => {
    this.#updateFilms(updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm, this.#filmsModel);
  };

  #handleLoadMoreButtonClick = () => {
    this.#renderFilms(FILMS_TO_RENDER_QUANTITY);
  };

}
