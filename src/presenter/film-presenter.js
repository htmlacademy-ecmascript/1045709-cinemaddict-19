import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupPresenter from './film-popup-presenter.js';
import { UserAction, UpdateType } from '../consts.js';


export default class FilmPresenter {
  #filmListContainer = null;
  #handleUpdateFilmData = null;

  #filmComponent = null;

  #popupPresenter = null;

  constructor({filmListContainer, onDataChange}) {
    this.#filmListContainer = filmListContainer;
    this.#handleUpdateFilmData = onDataChange;
  }

  init(filmData, comments) {
    const film = {
      ...filmData,
      comments: comments.filter((comment) => filmData.comments.includes(comment.id))
    };

    this.#popupPresenter = new FilmPopupPresenter({
      film,
      onControlBtnClick: this.#handleControlButton,
    });

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

  #handleClick = () => {
    this.#popupPresenter.showPopup();
  };

  #handleControlButton = (updatedFilm) => {
    this.#handleUpdateFilmData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      updatedFilm
    );
  };

}
