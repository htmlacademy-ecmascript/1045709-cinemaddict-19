import FilmPopupView from '../view/film-popup-view.js';
import { isEscPressed } from '../utils.js';

let openedPopup = null;

export default class FilmPopupPresenter {
  #filmPopupComponent = null;
  #film = null;

  constructor({ film, onControlBtnClick }) {
    this.#film = film;
    this.#filmPopupComponent = new FilmPopupView({
      film: this.#film,
      onCloseClick: this.#handleCloseClick,
      onControlBtnClick
    });
  }

  showPopup() {
    if (openedPopup) {
      openedPopup.closePopup();
    }
    document.body.classList.add('hide-overflow');
    document.body.appendChild(this.#filmPopupComponent.element);
    document.addEventListener('keydown', this.#closePopupKeydownHandler);
    openedPopup = this;
  }

  closePopup() {
    this.#filmPopupComponent.reset(this.#film);
    document.body.classList.remove('hide-overflow');
    document.body.removeChild(this.#filmPopupComponent.element);
    document.removeEventListener('keydown', this.#closePopupKeydownHandler);
    openedPopup = null;
  }

  #handleCloseClick = () => {
    this.closePopup();
  };

  #closePopupKeydownHandler = (evt) => {
    if (isEscPressed(evt)) {
      this.closePopup();
    }
  };

}
