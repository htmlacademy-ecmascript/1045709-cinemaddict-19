import { render } from '../framework/render.js';
import { DEFAULT_RENDERED_FILMS_QUANTITY, FILMS_TO_RENDER_QUANTITY } from '../consts.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
import EmptyFilmListView from '../view/empty-film-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import AwardedFilmsPresenter from './awarded-films-presenter.js';
import FilmPopupPresenter from './film-popup-presenter.js';

export default class FilmsPresenter {
  #filmSectionComponent = new FilmSectionView();
  #filmListContainerComponent = new FilmListContainerView();
  #filmListComponent = new FilmListView();
  #filmShowMoreBtnComponent = null;
  #filmsContainer = null;
  #filmsModel = null;
  #filmFilters = null;

  #films = [];
  #renderedFilmsCollection = this.#filmListContainerComponent.element.children;

  constructor({filmsContainer, filmsModel, filmFilters}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#filmFilters = filmFilters;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    this.#filmShowMoreBtnComponent = new ShowMoreBtnView({
      onClick: this.#handleLoadMoreButtonClick
    });
    render(this.#filmSectionComponent, this.#filmsContainer);
    render(this.#filmListComponent, this.#filmSectionComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);

    if (this.#films.length === 0) {
      const activeFilter = document.querySelector('.main-navigation__item--active').dataset.id;
      render(new EmptyFilmListView(this.#filmFilters, activeFilter), this.#filmSectionComponent.element);
      return;
    }

    this.#renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);

    render(this.#filmShowMoreBtnComponent, this.#filmListComponent.element);

    const awardedFilmsPrsenter = new AwardedFilmsPresenter(this.#filmSectionComponent.element, this.#films);
    awardedFilmsPrsenter.init();
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
    const filmComments = this.#filmsModel.comments.filter((comment) => film.comments.includes(comment.id));
    const filmPopupPresenter = new FilmPopupPresenter({film, filmComments});
    const filmCardComponent = new FilmCardView({
      film,
      onClick: () => {
        filmPopupPresenter.showPopup();
      }
    });

    render(filmCardComponent, this.#filmListContainerComponent.element);
  }

  #handleLoadMoreButtonClick = () => {
    this.#renderFilms(FILMS_TO_RENDER_QUANTITY);
  };


}
