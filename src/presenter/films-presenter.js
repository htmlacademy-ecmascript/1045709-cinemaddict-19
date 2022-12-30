import { render } from '../framework/render.js';
import { DEFAULT_RENDERED_FILMS_QUANTITY, FILMS_TO_RENDER_QUANTITY } from '../consts.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
import EmptyFilmListView from '../view/empty-film-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import TopRatedView from '../view/extra-top-rated-view.js';
import MostCommentedView from '../view/extra-most-commented-view.js';
import FilmPopupPresenter from './film-popup-presenter.js';

export default class FilmsPresenter {
  #filmSectionComponent = new FilmSectionView();
  #filmListContainerComponent = new FilmListContainerView();
  #filmListComponent = new FilmListView();
  #filmShowMoreBtnComponent = null;
  #filmsContainer = null;
  #filmsModel = null;

  #films = [];
  #renderedFilmsCollection = this.#filmListContainerComponent.element.children;

  constructor({filmsContainer, filmsModel}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    render(this.#filmSectionComponent, this.#filmsContainer);
    render(this.#filmListComponent, this.#filmSectionComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);

    if (this.#films.length === 0) {
      render(new EmptyFilmListView(document.querySelector('.main-navigation__item--active').dataset.id), this.#filmSectionComponent.element);
      return;
    }

    this.#renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);

    render(this.#filmShowMoreBtnComponent, this.#filmListComponent.element);
    render(new TopRatedView(), this.#filmSectionComponent.element);
    render(new MostCommentedView(), this.#filmSectionComponent.element);

  }

  #renderFilms(toRenderQuantity) {
    this.#filmShowMoreBtnComponent = new ShowMoreBtnView({
      onClick: this.#handleLoadMoreButtonClick
    });
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
