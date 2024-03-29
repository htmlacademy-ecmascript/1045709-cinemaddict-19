import AbstractView from '../framework/view/abstract-view.js';
import { getTimeFromMins, humanizeDate } from '../utils.js';
import { FilterType, DateFormat } from '../consts.js';

const DESCRIPTION_TEXT_LIMIT = 140;

const createFilmCardTemplate = (film) => {
  const {comments} = film;
  const {title, totalRating, poster, duration, genre, description} = film.filmInfo;
  const {alreadyWatched, favorite, watchlist} = film.userDetails;
  const {date} = film.filmInfo.release;

  const dateMarkup = humanizeDate(date, DateFormat.FILM_CARD);

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${dateMarkup}</span>
          <span class="film-card__duration">${getTimeFromMins(duration)}</span>
          <span class="film-card__genre">${genre.join(', ')}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">
          ${description.length < DESCRIPTION_TEXT_LIMIT ? description : `${description.slice(0, DESCRIPTION_TEXT_LIMIT)}...`}
        </p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">

        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist ? 'film-card__controls-item--active' : ''}"
        data-user-detail="watchlist" data-filter="${FilterType.WATCHLIST}" type="button">
          Add to watchlist
        </button>

        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatched ? 'film-card__controls-item--active' : ''}"
        data-user-detail="alreadyWatched" data-filter="${FilterType.HISTORY}" type="button">
          Mark as watched
        </button>

        <button class="film-card__controls-item film-card__controls-item--favorite ${favorite ? 'film-card__controls-item--active' : ''}"
        data-user-detail="favorite" data-filter="${FilterType.FAVORITE}" type="button">
          Mark as favorite
        </button>

      </div>
    </article>`
  );
};

export default class FilmCardView extends AbstractView {
  #film = null;
  #handleClick = null;
  #handleControlButtonClick = null;

  constructor({film, onClick, onControlBtnClick}) {
    super();
    this.#film = film;

    this.#handleClick = onClick;
    this.#handleControlButtonClick = onControlBtnClick;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
    this.element.querySelector('.film-card__controls').addEventListener('click', this.#controlButtonsClickHandler);

  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  #clickHandler = () => {
    this.#handleClick();
  };

  #controlButtonsClickHandler = (evt) => {
    if (evt.target.classList.contains('film-card__controls-item')) {
      const updatedUserDetails = {
        ...this.#film.userDetails,
        [evt.target.dataset.userDetail]: !this.#film.userDetails[evt.target.dataset.userDetail],
      };
      this.#handleControlButtonClick(updatedUserDetails, evt.target.dataset.filter);
    }
  };

}
