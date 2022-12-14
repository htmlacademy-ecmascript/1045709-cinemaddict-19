import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate } from '../utils.js';
import { FILM_CARD_DATE_FORMAT } from '../consts.js';

const createFilmCardTemplate = (film) => {
  const {comments} = film;
  const {title, totalRating, poster, duration, genre, description} = film.filmInfo;
  const {alreadyWatched, favorite, watchlist} = film.userDetails;
  const {date} = film.filmInfo.release;

  const dateMarkup = humanizeDate(date, FILM_CARD_DATE_FORMAT);

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${dateMarkup}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCardView extends AbstractView {
  #film = null;
  #handleClick = null;
  #handleWatchlistClick = null;
  #handleWatchedClick = null;
  #handleFavoriteClick = null;

  constructor({film, onClick, onWatchlistClick, onWatchedClick, onFavoriteClick}) {
    super();
    this.#film = film;

    this.#handleClick = onClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleWatchedClick = onWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);

  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  #clickHandler = () => {
    this.#handleClick();
  };

  #watchlistClickHandler = () => {
    this.#handleWatchlistClick();
  };

  #watchedClickHandler = () => {
    this.#handleWatchedClick();
  };

  #favoriteClickHandler = () => {
    this.#handleFavoriteClick();
  };

}
