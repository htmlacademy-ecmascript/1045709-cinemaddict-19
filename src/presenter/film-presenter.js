import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupPresenter from './film-popup-presenter.js';
import { UserAction, UpdateType } from '../consts.js';


export default class FilmPresenter {
  #filmListContainer = null;
  #commentsModel = null;
  #currentFilterType = null;
  #handleUpdateFilmData = null;

  #film = null;
  #filmComponent = null;

  #popupPresenter = null;

  constructor({filmListContainer, commentsModel, currentFilterType, onDataChange}) {
    this.#filmListContainer = filmListContainer;
    this.#commentsModel = commentsModel;
    this.#currentFilterType = currentFilterType;
    this.#handleUpdateFilmData = onDataChange;
  }

  init(film) {
    this.#film = film;
    this.#popupPresenter = new FilmPopupPresenter({
      film,
      commentsModel: this.#commentsModel,
      handleControlButton: this.#handleControlButton,
      handleAddComment: this.#handleAddComment,
      handleDeleteComment: this.#handleDeleteComment
    });

    const openedPopup = this.#popupPresenter.getOpenedPopup();

    if (openedPopup) {
      this.#popupPresenter.resetPopupComponent(openedPopup.filmPopupComponent, film);
    }

    const prevFilmComponent = this.#filmComponent;
    this.#filmComponent = new FilmCardView({
      film,
      onClick: this.#handleClick,
      onControlBtnClick: this.#handleControlButton,
    });

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
      return;
    }

    if (this.#filmListContainer.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  }

  destroy() {
    remove(this.#filmComponent);
  }

  setAborting(actionType) {
    const openedPopup = this.#popupPresenter.getOpenedPopup();
    if (openedPopup) {
      openedPopup.filmPopupComponent.errShake(actionType);
      return;
    }
    this.#filmComponent.shake();
  }

  #handleClick = () => {
    this.#popupPresenter.showPopup();
  };

  #handleControlButton = (updatedUserDetails, controlFilter) => {
    if (controlFilter === this.#currentFilterType) {
      this.destroy();
    }
    this.#handleUpdateFilmData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {...this.#film, userDetails: updatedUserDetails}
    );
  };

  #handleAddComment = (filmId, commentToAdd) => {
    this.#handleUpdateFilmData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      { filmId, commentToAdd }
    );
  };

  #handleDeleteComment = (updatedFilm) => {
    this.#handleUpdateFilmData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      updatedFilm
    );
  };

}
