import { render } from '../render.js';
import { DEFAULT_RENDERED_FILMS_QUANTITY, FILMS_TO_RENDER_QUANTITY } from '../consts.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import TopRatedView from '../view/extra-top-rated-view.js';
import MostCommentedView from '../view/extra-most-commented-view.js';
import FilmPopupPresenter from './film-popup-presenter.js';

export default class FilmsPresenter {
  #filmSectionComponent = new FilmSectionView();
  #filmListContainerComponent = new FilmListContainerView();
  #filmListComponent = new FilmListView();
  #filmShowMoreBtnComponent = new ShowMoreBtnView();
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

    this.#renderFilms(DEFAULT_RENDERED_FILMS_QUANTITY);

    this.#filmShowMoreBtnComponent.element.addEventListener('click', () => {
      this.#renderFilms(FILMS_TO_RENDER_QUANTITY);
    });

    render(this.#filmShowMoreBtnComponent, this.#filmListComponent.element);
    render(new TopRatedView(), this.#filmSectionComponent.element);
    render(new MostCommentedView(), this.#filmSectionComponent.element);

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
    const filmComponent = new FilmCardView({film});
    const filmPopupPresenter = new FilmPopupPresenter({film, filmComments});

    filmComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      filmPopupPresenter.showPopup();
    });

    render(filmComponent, this.#filmListContainerComponent.element);
  }

}
