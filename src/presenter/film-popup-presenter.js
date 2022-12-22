import FilmPopupView from '../view/film-popup-view.js';

export default class FilmPopupPresenter {
  #filmPopupComponent = null;
  #closeBtn = null;

  constructor({ film, filmComments }) {
    this.#filmPopupComponent = new FilmPopupView({film, filmComments});
    this.#closeBtn = this.#filmPopupComponent.element.querySelector('.film-details__close-btn');
  }

  showPopup() {
    document.body.classList.add('hide-overflow');
    document.body.appendChild(this.#filmPopupComponent.element);
    this.#closeBtn.addEventListener('click', this.#closePopupClickHandler);
    document.addEventListener('keydown', this.#closePopupKeydownHandler);
  }

  closePopup() {
    document.body.classList.remove('hide-overflow');
    document.body.removeChild(this.#filmPopupComponent.element);
    this.#closeBtn.removeEventListener('click', this.#closePopupClickHandler);
    document.removeEventListener('keydown', this.#closePopupKeydownHandler);
  }

  #closePopupClickHandler = () => {
    this.closePopup();
  };

  #closePopupKeydownHandler = (evt) => {
    if (evt.code === 'Escape') {
      this.closePopup();
    }
  };

}
