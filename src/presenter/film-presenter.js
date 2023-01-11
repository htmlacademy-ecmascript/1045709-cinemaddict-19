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
      filmComments: this.#comments
    });

    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCardView({
      film: this.#film,
      onClick: this.#handleClick,
      onWatchlistClick: this.#handleWatchlistClick,
      onWatchedClick: this.#handleWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick
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

  #handleWatchlistClick = () => {
    const updatedFilm = {...this.#film};
    updatedFilm.userDetails.watchlist = !this.#film.userDetails.watchlist;
    this.#handleUpdateFilmData(updatedFilm);
  };

  #handleWatchedClick = () => {
    const updatedFilm = {...this.#film};
    updatedFilm.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
    this.#handleUpdateFilmData(updatedFilm);
  };

  #handleFavoriteClick = () => {
    const updatedFilm = {...this.#film};
    updatedFilm.userDetails.favorite = !this.#film.userDetails.favorite;
    this.#handleUpdateFilmData(updatedFilm);
  };

}
