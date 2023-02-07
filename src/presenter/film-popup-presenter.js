import FilmPopupView from '../view/film-popup-view.js';
import { isEscPressed } from '../utils.js';

let openedPopup = null;

export default class FilmPopupPresenter {
  filmPopupComponent = null;
  #film = null;
  #commentsModel = null;

  #handleControlButton = null;
  #handleAddComment = null;
  #handleDeleteComment = null;

  constructor({ film, commentsModel, handleControlButton, handleAddComment, handleDeleteComment }) {
    this.#film = film;
    this.#commentsModel = commentsModel;

    this.#handleControlButton = handleControlButton;
    this.#handleAddComment = handleAddComment;
    this.#handleDeleteComment = handleDeleteComment;
  }

  showPopup() {
    this.#commentsModel.getFilmComments(this.#film.id).then((comments) => {
      if (openedPopup) {
        openedPopup.closePopup();
      }
      this.filmPopupComponent = new FilmPopupView({
        film: {...this.#film, comments},
        onCloseClick: this.#handleCloseClick,
        onControlBtnClick: this.#handleControlButton,
        onAddComment: this.#handleAddComment,
        onDeleteComment: this.#handleDeleteComment
      });
      document.body.classList.add('hide-overflow');
      document.body.appendChild(this.filmPopupComponent.element);
      document.addEventListener('keydown', this.#closePopupKeydownHandler);
      openedPopup = this;
    });
  }

  closePopup() {
    document.body.classList.remove('hide-overflow');
    document.body.removeChild(this.filmPopupComponent.element);
    document.removeEventListener('keydown', this.#closePopupKeydownHandler);
    openedPopup = null;
  }

  getOpenedPopup() {
    return openedPopup;
  }

  resetPopupComponent(popupComponent, film) {
    this.#commentsModel.getFilmComments(this.#film.id).then((comments) => {
      popupComponent.reset({...film, comments});
    });
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
