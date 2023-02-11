import { renderUpdatingComponent, getRandomArrayElement } from '../utils.js';
import { UpdateType } from '../consts.js';
import AwardTopRatedView from '../view/award-top-rated-view.js';
import AwardMostCommentedView from '../view/award-most-commented-view';
import FilmPresenter from './film-presenter.js';

export default class AwardedFilmListPresenter {
  #awardedFilmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;
  #handleUpdateFilmData = null;

  #films = null;
  #topRatedListComponent = null;
  #mostCommentedListComponent = null;

  filmPresenters = new Map();

  constructor({awardedFilmsContainer, filmsModel, commentsModel, filterModel, onDataChange}) {
    this.#awardedFilmsContainer = awardedFilmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
    this.#handleUpdateFilmData = onDataChange;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#films = this.#filmsModel.films;
    if (!this.#isFilmsRatingZero()) {
      this.#initTopRatedFilms();
    }
    if (!this.#isNoCommentedFilms()) {
      this.#initMostCommentedFilms();
    }
  }

  #initTopRatedFilms() {
    const filmsSortedByRating = [...this.#films].sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    const topRatedFilms = this.#isFilmsSameRating() ? this.#getRandomFilmsToAward() : [filmsSortedByRating[0], filmsSortedByRating[1]];

    const prevTopRatedComponent = this.#topRatedListComponent;
    this.#topRatedListComponent = new AwardTopRatedView({ topRatedFilmsComponents: this.#initFilmsCopmponents(topRatedFilms) });

    renderUpdatingComponent(this.#awardedFilmsContainer, this.#topRatedListComponent, prevTopRatedComponent);
  }

  #initMostCommentedFilms() {
    const filmsSortedByComments = [...this.#films].sort((a, b) => b.comments.length - a.comments.length);
    const mostCommentedFilms = this.#isFilmsSameCommentsQuantity() ? this.#getRandomFilmsToAward() : [filmsSortedByComments[0], filmsSortedByComments[1]];

    const prevMostCommentedListComponent = this.#mostCommentedListComponent;
    this.#mostCommentedListComponent = new AwardMostCommentedView({ mostCommentedFilmsComponents: this.#initFilmsCopmponents(mostCommentedFilms) });

    renderUpdatingComponent(this.#awardedFilmsContainer, this.#mostCommentedListComponent, prevMostCommentedListComponent);
  }

  #initFilmsCopmponents(films) {
    const components = [];
    const filmsPresenters = [this.#createFilmPresenter(), this.#createFilmPresenter()];

    filmsPresenters.forEach((filmPresenter, index) => {
      filmPresenter.init(films[index], true);
      components.push(filmPresenter.filmComponent);
      this.filmPresenters.set(films[index].id, filmPresenter);
    });

    return components;
  }

  #getRandomFilmsToAward() {
    const firstRandomFilm = getRandomArrayElement(this.#films);
    const secondRandomFilm = getRandomArrayElement(this.#films);
    return secondRandomFilm === firstRandomFilm ? this.#getRandomFilmsToAward() : [firstRandomFilm, secondRandomFilm];
  }

  #createFilmPresenter() {
    return new FilmPresenter({
      filmListContainer: this.#awardedFilmsContainer,
      awardedFilmsContainer: this.#awardedFilmsContainer,
      commentsModel: this.#commentsModel,
      currentFilterType: this.#filterModel.filter,
      onDataChange: this.#handleUpdateFilmData
    });
  }

  #isFilmsSameRating() {
    return this.#films.every((film) => film.filmInfo.totalRating === this.#films[0].filmInfo.totalRating);
  }

  #isFilmsRatingZero() {
    return this.#films.every((film) => film.filmInfo.totalRating === 0);
  }

  #isFilmsSameCommentsQuantity() {
    return this.#films.every((film) => film.comments.length === this.#films[0].comments.length);
  }

  #isNoCommentedFilms() {
    return this.#films.every((film) => film.comments.length === 0);
  }

  #handleModelEvent = (updateType, data) => {
    if (updateType === UpdateType.PATCH) {
      this.init();
      const updatedFilm = this.filmPresenters.get(data.id);
      const openedPopup = updatedFilm?.popupPresenter.getOpenedPopup();
      if (openedPopup) {
        updatedFilm.popupPresenter.resetPopupComponent(openedPopup.filmPopupComponent, data);
      }
    }
  };

}
