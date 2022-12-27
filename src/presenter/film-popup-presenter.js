import FilmPopupView from '../view/film-popup-view.js';
import { isEscPressed } from '../utils.js';

let openedPopup = null;

export default class FilmPopupPresenter {
  #filmPopupComponent = null;
  #closeBtn = null;

  constructor({ film, filmComments }) {
    this.#filmPopupComponent = new FilmPopupView({film, filmComments});
    this.#closeBtn = this.#filmPopupComponent.element.querySelector('.film-details__close-btn');
  }

  showPopup() {
    if (openedPopup) {
      openedPopup.closePopup();
    }
    document.body.classList.add('hide-overflow');
    document.body.appendChild(this.#filmPopupComponent.element);
    this.#closeBtn.addEventListener('click', this.#closePopupClickHandler);
    document.addEventListener('keydown', this.#closePopupKeydownHandler);
    openedPopup = this;
  }

  closePopup() {
    document.body.classList.remove('hide-overflow');
    document.body.removeChild(this.#filmPopupComponent.element);
    this.#closeBtn.removeEventListener('click', this.#closePopupClickHandler);
    document.removeEventListener('keydown', this.#closePopupKeydownHandler);
    openedPopup = null;
  }

  #closePopupClickHandler = () => {
    this.closePopup();
  };

  #closePopupKeydownHandler = (evt) => {
    if (isEscPressed(evt)) {
      this.closePopup();
    }
  };

}
