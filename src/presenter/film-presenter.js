import { render } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupPresenter from './film-popup-presenter.js';


export default class FilmPresenter {
  #filmListContainer = null;

  #filmComponent = null;

  #film = null;
  #comments = null;
  #popupPresenter = null;

  constructor({filmListContainer}) {
    this.#filmListContainer = filmListContainer;
  }

  init(film, filmsModel) {
    this.#film = film;
    this.#comments = filmsModel.comments.filter((comment) => film.comments.includes(comment.id));
    this.#popupPresenter = new FilmPopupPresenter({
      film: this.#film,
      filmComments: this.#comments
    });

    this.#filmComponent = new FilmCardView({
      film: this.#film,
      onClick: this.#handleClick
    });

    render(this.#filmComponent, this.#filmListContainer);
  }

  #handleClick = () => {
    this.#popupPresenter.showPopup();
  };

}
