import { render } from '../render.js';
import { getRandomArrayElement } from '../utils.js';
import FilmPopupView from '../view/film-popup-view.js';

export default class FilmPopupPresenter {

  constructor({ popupContainer, filmsModel }) {
    this.popupContainer = popupContainer;
    this.filmsModel = filmsModel;
  }

  init() {
    this.film = getRandomArrayElement(this.filmsModel.getFilms());
    this.comments = this.filmsModel.getComments().filter((comment) => this.film.comments.includes(comment.id));
  }

  showPopup() {
    render(
      new FilmPopupView({
        film: this.film,
        comments: this.comments
      }),
      this.popupContainer
    );
  }

}
