const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_FILM',
  DELETE_COMMENT: 'DELETE_FILM',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITE: 'favorites',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const COMMENTS_EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

const DEFAULT_RENDERED_FILMS_QUANTITY = 5;
const FILMS_TO_RENDER_QUANTITY = 5;

const FILM_CARD_DATE_FORMAT = 'YYYY';
const FILM_POPUP_DATE_FORMAT = 'D MMM YYYY';

export { UserAction, UpdateType, SortType, FilterType, COMMENTS_EMOTIONS, DEFAULT_RENDERED_FILMS_QUANTITY, FILMS_TO_RENDER_QUANTITY, FILM_CARD_DATE_FORMAT, FILM_POPUP_DATE_FORMAT };

