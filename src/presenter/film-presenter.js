import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupPresenter from './film-popup-presenter.js';


export default class FilmPresenter {
  #filmListContainer = null;
  #handleUpdateFilmData = null;

  #filmComponent = null;

  #film = null;
  #comments = null;
  #popupPresenter = null;

  constructor({filmListContainer, onDataChange}) {
    this.#filmListContainer = filmListContainer;
    this.#handleUpdateFilmData = onDataChange;
  }

  init(film, filmsModel) {
    this.#film = film;
    this.#comments = filmsModel.comments.filter((comment) => film.comments.includes(comment.id));
    this.#popupPresenter = new FilmPopupPresenter({
      film: this.#film,
      filmComments: this.#comments,
      onControlBtnClick: this.#handleControlButton,
    });

    const prevFilmComponent = this.#filmComponent;
    this.#filmComponent = new FilmCardView({
      film: this.#film,
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

  #getUpdatedFilmByUserDetail(userDetail) {
    return {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        [userDetail]: !this.#film.userDetails[userDetail],
      }
    };
  }

  #handleClick = () => {
    this.#popupPresenter.showPopup();
  };

  #handleControlButton = (userDetail) => {
    this.#handleUpdateFilmData(this.#getUpdatedFilmByUserDetail(userDetail));
  };

}
