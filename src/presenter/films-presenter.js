import {render} from '../render.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import TopRatedView from '../view/extra-top-rated-view.js';
import MostCommentedView from '../view/extra-most-commented-view.js';

export default class FilmsPresenter {
  #filmSectionComponent = new FilmSectionView();
  #filmListContainerComponent = new FilmListContainerView();
  #filmListComponent = new FilmListView();
  #filmsContainer = null;
  #filmsModel = null;

  #films = [];
  #comments = [];

  constructor({filmsContainer, filmsModel}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#filmsModel.comments];

    render(this.#filmSectionComponent, this.#filmsContainer);
    render(this.#filmListComponent, this.#filmSectionComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);

    for (let i = 0; i < this.#films.length; i++) {
      this.#renderFilm(this.#films[i]);
    }

    render(new ShowMoreBtnView(), this.#filmListComponent.element);
    render(new TopRatedView(), this.#filmSectionComponent.element);
    render(new MostCommentedView(), this.#filmSectionComponent.element);

  }

  #renderFilm(film) {
    const filmComponent = new FilmCardView({film});

    render(filmComponent, this.#filmListContainerComponent.element);
  }

}
